#!/bin/bash

# Nome do projeto
PROJECT_NAME="monitoramento"

# Paleta de cores
PRIMARY_COLOR="#003366"
SECONDARY_COLOR="#0066cc"
ACCENT_COLOR="#ffffff"
BACKGROUND_COLOR="#f0f4f7"

# Definir a versão do Chart.js
CHARTJS_VERSION="4.0.1"

# Função para verificar se o último comando foi bem-sucedido
check_success() {
    if [ $? -ne 0 ]; then
        echo "Erro durante a execução. Abortando script."
        exit 1
    fi
}

# Verifica se já está em um diretório de projeto Angular
if [ ! -f "angular.json" ]; then
  echo "Erro: Este não parece ser um projeto Angular. Verifique se você está no diretório correto."
  exit 1
fi

# Navega para o diretório do projeto
echo "Verificando o projeto Angular..."

# Instala as dependências
echo "Instalando dependências..."
npm install
check_success

# Instala o Bootstrap manualmente
echo "Instalando o Bootstrap..."
npm install bootstrap
check_success

# Instala o Chart.js
echo "Instalando o Chart.js..."
npm install chart.js@$CHARTJS_VERSION --save
check_success

# Adiciona o Bootstrap manualmente no angular.json
echo "Configurando o Bootstrap no angular.json..."
sed -i 's/"styles": \["src\/styles.scss"\]/"styles": \["src\/styles.scss", "node_modules\/bootstrap\/dist\/css\/bootstrap.min.css"\]/' angular.json
check_success

# Configura o angular.json para garantir que o SCSS está configurado corretamente
echo "Configurando SCSS no angular.json..."
sed -i 's/"stylePreprocessorOptions": {}/"stylePreprocessorOptions": { "includePaths": ["src"] }/' angular.json
check_success

# Cria a estrutura de pastas e componentes conforme a necessidade
echo "Criando estrutura de pastas e componentes..."
mkdir -p src/app/{components/{header,footer,sidebar,chart},pages/{poco,detalhes-poco,sensores,alertas,configurações},services}
check_success

# Cria os componentes básicos e serviços
echo "Gerando componentes e serviços..."
ng generate component components/chart --skip-tests
check_success

# Adiciona o código para exibir gráficos no ChartComponent
echo "Configurando ChartComponent..."
cat <<EOT > src/app/components/chart/chart.component.ts
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
          borderColor: '$SECONDARY_COLOR',
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
          backgroundColor: ['$SECONDARY_COLOR', '$PRIMARY_COLOR', '$ACCENT_COLOR']
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
EOT
check_success

# Adiciona o template do ChartComponent
echo "Configurando template do ChartComponent..."
cat <<EOT > src/app/components/chart/chart.component.html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <h5>Nível de Água</h5>
      <canvas id="waterLevelCanvas"></canvas>
    </div>
    <div class="col-md-6">
      <h5>Status dos Sensores</h5>
      <canvas id="sensorStatusCanvas"></canvas>
    </div>
  </div>
</div>
EOT
check_success

# Adiciona estilos básicos para o ChartComponent
echo "Configurando estilos para ChartComponent..."
cat <<EOT > src/app/components/chart/chart.component.scss
canvas {
  max-width: 100%;
  height: 300px;
}
EOT
check_success

# Atualiza o DashboardComponent para incluir o ChartComponent
echo "Atualizando DashboardComponent..."
cat <<EOT > src/app/components/dashboard/dashboard.component.html
<div class="container">
  <h2>Dashboard</h2>
  <div class="row">
    <div class="col-md-12">
      <app-chart></app-chart>
    </div>
  </div>
</div>
EOT
check_success

# Finaliza a configuração
echo "Projeto '$PROJECT_NAME' configurado com gráficos! Execute 'npm start' para visualizar."
