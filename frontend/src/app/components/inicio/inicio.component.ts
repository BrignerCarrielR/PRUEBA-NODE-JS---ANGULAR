import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ApiService} from '../../api.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  standalone: true,  // Indicando que es un componente standalone
  imports: [CommonModule, RouterModule,HttpClientModule],  // Asegúrate de importar los módulos necesarios
  providers: [ApiService],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    intentosFallidos: 3,
    horaInicio: new Date('2024-11-28T08:30:00'),
    horaFin: new Date('2024-11-28T09:00:00'),
  };

  nombreUsuario: string | null = null;
  urlactual: string;

  // Definimos la propiedad 'menuItems'
  menuItems = [
    { nombreopcion: 'Personas', route: '/personas' },
    { nombreopcion: 'Usuarios', route: '/mantenimineto_usuarios' },
    { nombreopcion: 'Dashboard', route: '/dashboard' }
  ];

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.nombreUsuario = this.authService.nombreUser;
    this.urlactual = this.router.url;
    this.getRolOpciones()
  }

  getRolOpciones() {
    this.apiService.get<any[]>('rol_opciones')
      .subscribe(
        data => {
          console.log(data);

          // Generamos las URLs para cada opción
          this.menuItems = data.map(item => {
            // Aquí generamos la URL basándonos en el nombre de la opción
            let route = '';

            // Generamos la URL según el nombre de la opción
            switch (item.nombreopcion) {
              case 'Personas':
                route = '/personas';
                break;
              case 'Usuarios':
                route = '/mantenimineto_usuarios';
                break;
              case 'Dashboard':
                route = '/dashboard';
                break;
              default:
                route = '/'; // O alguna ruta predeterminada si no hay coincidencia
                break;
            }

            // Retornamos el objeto con 'nombreopcion' y la 'route' generada
            return {
              ...item,
              route: route
            };
          });

          console.log(this.menuItems); // Verifica que las rutas se asignaron correctamente
        },
        error => {
          console.error('Error fetching menu options:', error);
        }
      );
  }


  // Función para determinar si la URL actual corresponde con el enlace
  isActive(url: string): boolean {
    return this.urlactual === url;
  }
}

