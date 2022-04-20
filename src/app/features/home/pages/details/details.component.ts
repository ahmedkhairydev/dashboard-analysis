import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/core/interfaces/data';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  chartDetails!: Data | any;
  chartDetailsKeys!: string[];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.selectedPoint$.subscribe(chart => {
      this.chartDetails = chart || JSON.parse(localStorage.getItem('selectedPoint') as string);
      this.chartDetailsKeys = Object.keys(this.chartDetails);
    });
  }
}
