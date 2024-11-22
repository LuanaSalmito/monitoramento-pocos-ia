import { Component, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  lastUpdated = {
    waterLevel: '15 minutos atrás',
    sensorStatus: '10 minutos atrás',
    productionTrend: '1 hora atrás',
    sensorComparison: '2 horas atrás',
  };  
  dashboardTitle = 'Dashboard de Monitoramento';
  currentDate = new Date().toLocaleDateString('pt-BR');
  productionRate = 1200;
  productionStatus = 'Normal';
  alertCount = 5;

  sensors = [
    { name: 'Sensor 1', status: 'OK', lastChecked: '5 minutos atrás' },
    { name: 'Sensor 2', status: 'Manutenção', lastChecked: '30 minutos atrás' },
    { name: 'Sensor 3', status: 'Falha', lastChecked: '1 hora atrás' }
  ];

  detailedAlerts = [
    { description: 'Pressão alta no sensor 3', resolved: false },
    { description: 'Temperatura fora do limite no sensor 2', resolved: true }
  ];

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
    const options = {
      chart: {
        type: 'line',
        height: 350
      },
      series: [
        {
          name: 'Nível de Água (m)',
          data: [20, 18, 22, 19, 21]
        }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Nível de Água'
      }
    };

    const chart = new ApexCharts(document.querySelector('#waterLevelChart'), options);
    chart.render();
  }

  initializeSensorStatusChart(): void {
    const options = {
      chart: {
        type: 'bar',
        height: 350
      },
      series: [
        {
          name: 'Status (%)',
          data: [90, 75, 85]
        }
      ],
      xaxis: {
        categories: ['Sensor 1', 'Sensor 2', 'Sensor 3']
      },
      colors: ['#0066cc', '#003366', '#ffffff'],
      title: {
        text: 'Status dos Sensores'
      }
    };

    const chart = new ApexCharts(document.querySelector('#sensorStatusChart'), options);
    chart.render();
  }

  initializeProductionTrendChart(): void {
    const options = {
      chart: {
        type: 'line',
        height: 350
      },
      series: [
        {
          name: 'Produção (barris)',
          data: [150, 160, 155, 170, 165]
        }
      ],
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Tendência de Produção'
      }
    };

    const chart = new ApexCharts(document.querySelector('#productionTrendChart'), options);
    chart.render();
  }

  initializeSensorComparisonChart(): void {
    const options = {
      chart: {
        type: 'radar',
        height: 350
      },
      series: [
        {
          name: 'Desempenho (%)',
          data: [80, 85, 90, 75]
        }
      ],
      xaxis: {
        categories: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4']
      },
      title: {
        text: 'Comparação de Sensores'
      }
    };

    const chart = new ApexCharts(document.querySelector('#sensorComparisonChart'), options);
    chart.render();
  }
}
