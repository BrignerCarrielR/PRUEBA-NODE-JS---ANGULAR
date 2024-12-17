import { Component} from '@angular/core';
import { ApiService } from '../../../api.service';
import { InicioComponent } from '../../inicio/inicio.component';

export interface Dashboard {
  activos: number;
  bloqueados: number;
  inactivos: number;
  sesion_fallidas: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InicioComponent],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  dashboard: Dashboard = {
    activos: 0,
    inactivos: 0,
    bloqueados: 0,
    sesion_fallidas: 0,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getusuarios_stats();
  }

  getusuarios_stats() {
    this.apiService.get<Dashboard>('infoSistema/datos_dashboard').subscribe(
      (data) => {
        this.dashboard = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error.message);
      }
    );
  }


}
