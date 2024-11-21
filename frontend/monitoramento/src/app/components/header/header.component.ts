import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Sistema de Monitoramento de Poços';
  currentDate = new Date().toLocaleDateString(); // Data atual no formato local
}
