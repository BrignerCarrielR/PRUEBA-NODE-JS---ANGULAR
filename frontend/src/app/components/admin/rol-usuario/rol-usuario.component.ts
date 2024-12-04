import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InicioComponent} from '../../inicio/inicio.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-rol-usuario',
  standalone: true,
  imports: [CommonModule, InicioComponent, FormsModule], // Asegúrate de incluir CommonModule
  providers: [ApiService],
  templateUrl: './rol-usuario.component.html',
  styleUrl: './rol-usuario.component.css'
})
export class RolUsuarioComponent implements OnInit {
  usuarios: any[] = []
  roles: any[] = []
  datosRolUsuario = {
    idusuario: 0,
    idrol: 0
  }

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.getRoles()
    this.getUsuarios()
  }

  GuardarRolUsuario() {

    if (this.datosRolUsuario.idusuario === 0 || this.datosRolUsuario.idrol === 0) {
      if (this.datosRolUsuario.idusuario === 0 && this.datosRolUsuario.idrol === 0) {
        alert('Seleccione un usuario y un rol.');
      } else if (this.datosRolUsuario.idusuario === 0) {
        alert('Seleccione un usuario.');
      } else if (this.datosRolUsuario.idrol === 0) {
        alert('Seleccione un rol.');
      }
      return;
    }

    this.postRolUsuario();

    this.datosRolUsuario = {
      idusuario: 0,
      idrol: 0
    };

    alert('Rol asignado correctamente al usuario');
  }


  postRolUsuario(): void {
    this.apiService.post<{ message: string }>(`rol`, this.datosRolUsuario)
      .subscribe(
        data => {
          console.log('Respuesta de la api:', data.message);
          alert(data.message);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }

  getUsuarios(): void {
    this.apiService.get<any>(`rol_usuarios`)
      .subscribe(
        data => {
          this.usuarios = data;
          console.log('Usuarios', this.usuarios);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }

  getRoles(): void {
    this.apiService.get<any>(`rol_rol`)
      .subscribe(
        data => {
          this.roles = data;
          console.log('Roles', this.roles);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }
}
