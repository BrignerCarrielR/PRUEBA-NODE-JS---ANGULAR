import { Component, OnInit } from '@angular/core';
import {InicioComponent} from '../../inicio/inicio.component';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [InicioComponent, HttpClientModule],
  providers: [ApiService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  usuarios = {
    activos: 0,
    inactivos: 0,
    bloqueados: 0,
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getusuarios_stats()
  }

  getusuarios_stats() {
    this.apiService.get<any[]>('/usuarios_stats/')  // Esperamos un array de objetos
      .subscribe(
        (data) => {  // No es necesario tipar `data` como `any[]` explícitamente aquí
          if (data && data.length > 0) {  // Aseguramos que hay datos
            // Convertimos los valores a número, en caso de que sean strings
            this.usuarios.activos = Number(data[0].activos);
            this.usuarios.inactivos = Number(data[0].inactivos);
            this.usuarios.bloqueados = Number(data[0].bloqueados);

            // Si la conversión resulta en NaN, puede ser útil manejarlo:
            if (isNaN(this.usuarios.activos)) {
              console.error("El valor de 'activos' no es un número válido.");
            }
            if (isNaN(this.usuarios.inactivos)) {
              console.error("El valor de 'inactivos' no es un número válido.");
            }
            if (isNaN(this.usuarios.bloqueados)) {
              console.error("El valor de 'bloqueados' no es un número válido.");
            }
          }
        },
        error => {
          console.error("Error al obtener los datos:", error);
        }
      );
  }
}
