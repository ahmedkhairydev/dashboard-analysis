import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { Data, LookUp } from 'src/app/core/interfaces/data';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries$!: Observable<LookUp[]>;
  camps$!: Observable<LookUp[]>;
  schools$!: Observable<LookUp[]>;

  chartData!: Data[] | null;
  labels = this.homeService.months;
  series: { name: string; data: number[]; }[] = [];
  totalNoOfLessons!: number;

  chartFilterFormGroup!: FormGroup;

  private destroy = new Subject<any>();

  constructor(private homeService: HomeService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.getChartData();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (!Object.getOwnPropertyNames(this.activatedRoute.snapshot.queryParams).length) {
        this.chartFilterFormGroup.reset();
      }
    });
  }

  initForm() {
    this.chartFilterFormGroup = this.fb.group({
      country: [null],
      camp: [null],
      school: [null],
    });

    this.chartFilterFormGroup.valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => this.filterChartData(value));
  }

  getChartData() {
    this.homeService.chartData$.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.chartData = data;
      this.getLookups();

      this.chartFilterFormGroup.patchValue(this.activatedRoute.snapshot.queryParams);
    });
  }

  getLookups() {
    const showAll = [{ id: 0, text: 'Show All' }];
    this.countries$ = this.homeService.countries;
    this.camps$ = this.homeService.camps;
    this.schools$ = this.homeService.schools.pipe(map(schools => schools = [...showAll, ...schools]));
  }

  filterChartData(filter: any) {
    let series: { name: string; data: number[]; }[] = [];
    const filterKeys = Object.keys(filter).filter(key => filter[key]).filter(key => filter[key] !== 'Show All'),
      filteredData = this.chartData?.filter((eachRecord: any) => filterKeys.every(key => eachRecord[key] === filter[key])) || [],
      schools = [...new Set(filteredData?.map(eachRecord => eachRecord.school))];

    schools?.forEach(school => {
      const groupedBySchool = filteredData?.filter(eachRecord => eachRecord.school === school) || [];

      series.push({
        name: school,
        data: this.homeService.generateSeriesDataByMonths(groupedBySchool)
      });
    });

    this.series = [];
    setTimeout(() => this.series = series);

    this.totalNoOfLessons = series.map(each => each.data.reduce((a, b) => a + b)).reduce((x, y) => x + y);

    let queryParams: Params = {};
    filterKeys.map(key => queryParams[key] = filter[key]);

    if (Object.getOwnPropertyNames(queryParams).length) {
      this.router.navigate([''], { relativeTo: this.activatedRoute, queryParams });
    }
  }

  getSelectedPoint(event: Data) {
    const country = this.activatedRoute.snapshot.queryParamMap.get('country') || '', camp = this.activatedRoute.snapshot.queryParamMap.get('camp') || '',
      selectedPoint: Partial<Data> = { ...event, country, camp };

    this.homeService.addPoint(selectedPoint);
    localStorage.setItem('selectedPoint', JSON.stringify(selectedPoint));

    // this.router.navigate(['/dashboard/details'], { queryParams: this.activatedRoute.snapshot.queryParams });
    window.open(`/dashboard/details`, '_self');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy.next(true);
  }
}
