import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['../dashboard/dasboard.component.scss']  
})
export class DashboardComponent implements OnInit {

  dashboardTitle: string = 'Monitoramento de Poços de Petróleo';
  currentDate: string = '';
  waterLevel: number = 20; // Nível de água no poço
  sensorStatus: number = 85; // Status do sensor
  alertCount: number = 5; // Contagem de alertas
  productionStatus: string = 'Em Produção'; // Status de produção
  productionRate: number = 5000; // Taxa de produção do poço (barris/dia)
  
  sensors: any[] = [
    { name: 'Sensor 1', status: 'Ativo', lastChecked: '2024-11-20 15:30' },
    { name: 'Sensor 2', status: 'Inativo', lastChecked: '2024-11-20 14:00' },
    { name: 'Sensor 3', status: 'Ativo', lastChecked: '2024-11-20 16:00' },
  ];

  detailedAlerts: any[] = [
    { id: 1, description: 'Sensor 1 falhou ao verificar nível de água', resolved: false },
    { id: 2, description: 'Poço 2 fora do nível esperado', resolved: false },
  ];

  updateInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.setCurrentDate();
    this.startAutoUpdate();
  }

  setCurrentDate(): void {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    this.currentDate = date.toLocaleDateString('pt-BR', options);
  }

  handleAlerts(): void {
    alert(`Há ${this.alertCount} alertas pendentes.`);
  }

  updateData(): void {
    this.waterLevel = this.getRandomInt(10, 30);
    this.sensorStatus = this.getRandomInt(70, 100);
    this.alertCount = this.getRandomInt(0, 10);
    this.productionRate = this.getRandomInt(4000, 6000); // Simula a produção de petróleo
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startAutoUpdate(): void {
    this.updateInterval = setInterval(() => {
      this.updateData();
    }, 10000);
  }

  stopAutoUpdate(): void {
    clearInterval(this.updateInterval);
  }
}
