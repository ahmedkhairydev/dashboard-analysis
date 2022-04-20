import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Data, LookUp } from 'src/app/core/interfaces/data';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private chartData = new BehaviorSubject<Data[] | null>(null);
  private selectedPoint = new BehaviorSubject<Partial<Data> | null>(null);

  selectedPoint$ = this.selectedPoint.asObservable();

  constructor(private http: HttpService) { }

  get chartData$() {
    if (this.chartData.value) {
      return this.chartData.asObservable();
    }

    return this.http.get<Data[]>({ APIName: 'https://raw.githubusercontent.com/mosafwat/analysis-fe-challenge/master/data.json' }).pipe(map(chartData => {
      this.chartData.next(chartData);
      return chartData;
    }));
  }

  get countries(): Observable<LookUp[]> {
    return this.chartData$.pipe(map(chartData => {
      const countries = [...new Set(chartData?.map(each => each.country))];
      return countries.map((country, index) => ({ id: index + 1, text: country }));
    }));
  }

  get camps(): Observable<LookUp[]> {
    return this.chartData$.pipe(map(chartData => {
      const camps = [...new Set(chartData?.map(each => each.camp))];
      return camps.map((camp, index) => ({ id: index + 1, text: camp }));
    }));
  }

  get schools(): Observable<LookUp[]> {
    return this.chartData$.pipe(map(chartData => {
      const schools = [...new Set(chartData?.map(each => each.school))];
      return schools.map((school, index) => ({ id: index + 1, text: school }));
    }));
  }

  get months(): string[] {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  get monthsArabic(): string[] {
    return ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونية', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  }

  addPoint(selectedPoint: Partial<Data>) {
    this.selectedPoint.next(selectedPoint);
  }

  generateSeriesDataByMonths(data: Data[]) {
    let initial: any = {};

    const mergedByMonth = data.reduce((previous, current) => {
      if (previous[current.month]) {
        previous[current.month] = [previous[current.month], current.lessons].reduce((pre, cur) => pre + cur);
      } else {
        previous[current.month] = current.lessons;
      }

      return previous;
    }, initial);

    return this.months.map(month => (mergedByMonth[month] ? mergedByMonth[month] : 0));
  }
}
