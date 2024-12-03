import {Component, OnInit} from '@angular/core';
import {InicioComponent} from '../../inicio/inicio.component';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';

interface Dashboard {
  activos: number,
  bloqueados: number,
  inactivos: number,
  sesion_fallidas: number,
}

@Component({
  selector: 'app-dashboard',
  imports: [InicioComponent, HttpClientModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard = {
    activos: 0,
    inactivos: 0,
    bloqueados: 0,
    sesion_fallidas: 0
  };

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getusuarios_stats()
  }

  getusuarios_stats() {
    this.apiService.get<Dashboard>('datos_dashboard')  // Esperamos un array de objetos
      .subscribe(
        (data) => {  // No es necesario tipar `data` como `any[]` explícitamente aquí
          this.dashboard = data;
          console.log(data);
        },
        error => {
          console.error("Error al obtener los datos:", error.message);
        }
      );
  }
}
