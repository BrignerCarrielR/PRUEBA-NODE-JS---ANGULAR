import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { InicioComponent } from '../inicio/inicio.component';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule, InicioComponent, FormsModule],
  providers: [ApiService],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  listaUsuarios: any[] = [];
  idUsuario = 0;
  usuarioEditar: any = null; // Variable para almacenar el usuario que se va a editar

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.getListaUsuarios();
    this.idUsuario = this.authService.id || 0;
  }

  getListaUsuarios() {
    this.apiService.get<any[]>('usuarios').subscribe(
      data => {
        console.log('Usuarios recibidos:', data);
        this.listaUsuarios = data;
      },
      error => console.error('Error al obtener usuarios:', error)
    );
  }

  // Función para iniciar la edición de un usuario
  editarUsuario(usuario: any) {
    this.usuarioEditar = { ...usuario }; // Clonamos el usuario para evitar modificar el objeto original directamente
  }

  // Función para guardar los cambios del usuario
  guardarEdicion() {
    if (this.usuarioEditar) {
      this.apiService.put<any>(`usuarios/${this.usuarioEditar.idusuario}`, this.usuarioEditar).subscribe(
        () => {
          this.getListaUsuarios(); // Refrescamos la lista de usuarios
          this.usuarioEditar = null; // Limpiamos el formulario de edición
        },
        error => console.error('Error al editar usuario:', error)
      );
    }
  }

  cambiarEstadoUsuario(idUsuario: string) {
    console.log(idUsuario);
    if (confirm('¿Está seguro de cambiar el estado de este usuario?')) {
      this.apiService.put<any>(`usuarios/estado/${idUsuario}`, {}).subscribe(
        () => this.getListaUsuarios(),
        error => console.error('Error al cambiar estado del usuario:', error)
      );
    }
  }
}
