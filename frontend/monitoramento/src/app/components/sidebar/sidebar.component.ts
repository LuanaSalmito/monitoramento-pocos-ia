import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule], 
})
export class SidebarComponent {
  menuItems = [
    { name: 'Dashboard', link: '/dashboard', icon: 'fa-chart-line' },
    { name: 'Sensores', link: '/sensors', icon: 'fa-microchip' },
    { name: 'Alertas', link: '/alerts', icon: 'fa-bell' },
    { name: 'Relatórios', link: '/reports', icon: 'fa-file-alt' },
    { name: 'Configurações', link: '/settings', icon: 'fa-cog' },
  ];
}
