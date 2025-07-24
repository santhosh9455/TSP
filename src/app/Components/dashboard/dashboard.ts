import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ChartComponent
} from 'ng-apexcharts';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
}
@Component({
  selector: 'app-dashboard',
  imports: [ChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Students',
          data: [101, 41, 35, 51, 49, 62, 69],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'Weekly Student Count',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#4F46E5', // Indigo-600 (Tailwind)
        },
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: '#6B7280', // gray-500
            fontSize: '14px',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          gradientToColors: ['#6366F1'], // Indigo-500
          stops: [0, 100],
        },
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
          formatter: (val: number) => `${val} students`,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '45%',
        },
      },
    };
  }

}
