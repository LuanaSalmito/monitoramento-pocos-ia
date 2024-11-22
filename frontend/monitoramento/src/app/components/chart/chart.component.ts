import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  waterLevelChart: Chart | undefined;
  sensorStatusChart: Chart | undefined;
  productionTrendChart: Chart | undefined;
  sensorComparisonChart: Chart | undefined;

  lastUpdated = {
    waterLevel: '15 minutos atrás',
    sensorStatus: '10 minutos atrás',
    productionTrend: '1 hora atrás',
    sensorComparison: '2 horas atrás',
  };

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.initializeWaterLevelChart();
    this.initializeSensorStatusChart();
    this.initializeProductionTrendChart();
    this.initializeSensorComparisonChart();
  }

  initializeWaterLevelChart(): void {
    this.waterLevelChart = new Chart('waterLevelCanvas', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Nível de Água (m)',
            data: [20, 18, 22, 19, 21],
            borderColor: '#0066cc',
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    });
  }

  initializeSensorStatusChart(): void {
    this.sensorStatusChart = new Chart('sensorStatusCanvas', {
      type: 'bar',
      data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3'],
        datasets: [
          {
            label: 'Status (%)',
            data: [90, 75, 85],
            backgroundColor: ['#0066cc', '#003366', '#ffffff'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    });
  }

  initializeProductionTrendChart(): void {
    this.productionTrendChart = new Chart('productionTrendCanvas', {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [
          {
            label: 'Produção (barris)',
            data: [150, 160, 155, 170, 165],
            borderColor: '#00cc66',
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    });
  }

  initializeSensorComparisonChart(): void {
    this.sensorComparisonChart = new Chart('sensorComparisonCanvas', {
      type: 'radar',
      data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4'],
        datasets: [
          {
            label: 'Desempenho (%)',
            data: [80, 85, 90, 75],
            backgroundColor: 'rgba(0, 102, 204, 0.3)',
            borderColor: '#0066cc',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          r: {
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
      },
    });
  }

  refreshChart(chartType: string): void {
    const now = new Date();
    const updatedTime = `${now.getHours()}:${now.getMinutes()} (atualizado agora)`;

    switch (chartType) {
      case 'waterLevel':
        this.waterLevelChart?.update();
        this.lastUpdated.waterLevel = updatedTime;
        break;

      case 'sensorStatus':
        this.sensorStatusChart?.update();
        this.lastUpdated.sensorStatus = updatedTime;
        break;

      case 'productionTrend':
        this.productionTrendChart?.update();
        this.lastUpdated.productionTrend = updatedTime;
        break;

      case 'sensorComparison':
        this.sensorComparisonChart?.update();
        this.lastUpdated.sensorComparison = updatedTime;
        break;

      default:
        break;
    }
  }
}
