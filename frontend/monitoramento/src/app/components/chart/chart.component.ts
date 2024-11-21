import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public waterLevelChart: any;
  public sensorStatusChart: any;

  ngOnInit(): void {
    // Gráfico de nível de água
    this.waterLevelChart = new Chart('waterLevelCanvas', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Nível de Água (m)',
          data: [20, 18, 22, 19, 21],
          borderColor: '#0066cc',
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });

    // Gráfico de status dos sensores
    this.sensorStatusChart = new Chart('sensorStatusCanvas', {
      type: 'bar',
      data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3'],
        datasets: [{
          label: 'Status (%)',
          data: [90, 75, 85],
          backgroundColor: ['#0066cc', '#003366', '#ffffff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });
  }
}
