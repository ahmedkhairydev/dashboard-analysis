import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApexChart, ApexPlotOptions, ApexLegend, ApexStroke, ApexAxisChartSeries, ApexGrid, ApexXAxis, ApexYAxis, ApexMarkers, ApexTooltip, ApexResponsive } from 'ng-apexcharts';

type ChartOptions = {
  labels: string[];
  colors: string[];
  series: ApexAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  chartOptions!: ChartOptions;

  @Input() labels!: string[];
  @Input() series!: { name: string; data: number[]; }[];
  @Input() colors!: string[];
  @Input() yaxisTitle!: string;

  @Output() selectedPoint = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      labels: this.labels,
      series: this.series,
      colors: this.colors,
      chart: {
        type: "line",
        fontFamily: 'Cairo',
        foreColor: '#1d252d',
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        events: {
          dataPointSelection: ((_e, _chart, config) => {
            const seriesIndex = config.seriesIndex, dataPointIndex = config.dataPointIndex, selectedseries = this.series[seriesIndex],
              month = this.labels[dataPointIndex], school = selectedseries.name, totalMonthLesson = selectedseries.data[dataPointIndex];

            this.selectedPoint.emit({ month, school, totalMonthLesson });
          }),
        }
      },
      legend: {
        show: true,
        width: 250,
        position: 'right',
        fontFamily: 'Cairo',
        markers: {
          width: 7,
          height: 17,
          radius: 2,
          offsetX: 0,
          offsetY: 0
        },
        labels: {
          useSeriesColors: true
        },
        itemMargin: {
          horizontal: 0,
          vertical: 8
        },
        formatter: ((legandName, opts) => {
          const series = opts.w.config.series[opts.seriesIndex].data;

          if (series.length) {
            const noOfLessons = series.reduce((previous: number, current: number) => previous + current);
            return `${legandName} - ${noOfLessons} Lessons`;
          }

          return legandName;
        })
      },
      stroke: {
        curve: "smooth"
      },
      grid: {
        row: {
          colors: ["#8b61a880", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      yaxis: {
        title: {
          text: this.yaxisTitle,
          style: {
            fontSize: '1rem'
          }
        }
      },
      tooltip: {
        enabled: true,
        intersect: true,
        shared: false
      },
      markers: {
        size: 5
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              zoom: {
                enabled: true
              }
            },
            legend: {

              position: 'bottom',
            }
          }
        }
      ]
    };
  }

}
