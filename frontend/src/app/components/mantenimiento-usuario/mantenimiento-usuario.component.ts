import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../inicio/inicio.component';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Usuario {
  idusuario: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  mail: string;
  rolname: string;
  status: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-mantenimiento-usuario',
  standalone: true,
  imports: [CommonModule, InicioComponent, FormsModule],
  providers: [ApiService],
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.css']
})
export class MantenimientoUsuarioComponent implements OnInit {
  // lista completa de usuarios y usuarios filtrados
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];

  // datos del usuario a actualizar
  usuarioActualizar = {
    id: 0,
    nombres: '',
    apellidos: '',
    username: '',
    mail: ''
  };

  isAdmin: boolean | null = null; // estado de admin del usuario actual
  showModal: boolean = false; // controla la visibilidad del modal
  EstadoActualizarUsuario: boolean = false; // indica si se está actualizando un usuario

  constructor(private authService: AuthService, private apiService: ApiService, private route: ActivatedRoute) {
    this.isAdmin = this.authService.es_staff;
  }

  ngOnInit(): void {
    this.loadUsuarios(); // carga los usuarios al inicializar
    this.getDatosUsuario(); // obtiene los datos del usuario actual
  }

  // carga la lista de usuarios desde la api
  loadUsuarios(): void {
    this.apiService.get<Usuario[]>('usuarios').subscribe(
      data => {
        this.usuarios = data;
        this.filteredUsuarios = data;
      },
      error => {
        console.error(error.message);
        alert(error.message);
      }
    );
  }

  // abre el modal para actualizar los datos del admin
  actualizarDatosAdmin() {
    this.showModal = true;
    this.getDatosUsuario();
  }

  // prepara los datos de un usuario para ser actualizados
  SelectActualizarUsuarios(usuario: Usuario): void {
    this.usuarioActualizar.id = usuario.idusuario;
    this.usuarioActualizar.nombres = usuario.nombres;
    this.usuarioActualizar.apellidos = usuario.apellidos;
    this.usuarioActualizar.username = usuario.username;
    this.usuarioActualizar.mail = usuario.mail;
    this.showModal = true; // muestra el modal
    this.EstadoActualizarUsuario = true; // indica que se está actualizando un usuario
  }

  // actualiza los datos de un usuario
  ActualizarUsuarios(): void {
    this.putUsuarios();
  }

  // actualiza los datos del usuario actual
  ActualizarUsuario(): void {
    this.putUsuario();
    this.EstadoActualizarUsuario = false;
    this.showModal = false;
  }

  // realiza una petición put para actualizar los datos de un usuario
  putUsuarios(): void {
    this.apiService.put<{ message: string }>(`usuarios/datos/${this.usuarioActualizar.id}`, this.usuarioActualizar).subscribe(
      data => {
        this.loadUsuarios();
        alert(data.message);
        this.showModal = false; // cierra el modal
      },
      error => {
        console.error('error al enviar datos a la api:', error.message);
        alert('error al enviar los datos a la api.');
      }
    );
  }

  // realiza una petición put para actualizar los datos del usuario logueado
  putUsuario() {
    this.apiService.put<{ message: string }>(`usuarios/datos/${this.authService.id}`, this.usuarioActualizar).subscribe(
      data => {
        console.log('datos enviados a la api:', data);
        this.getDatosUsuario();
        this.loadUsuarios();
        alert(data.message);
      },
      error => {
        console.error('error al enviar datos a la api:', error.message);
        alert('error al enviar los datos a la api.');
      }
    );
  }

  // obtiene los datos del usuario logueado
  getDatosUsuario(): void {
    this.apiService.get<any>(`usuarios/${this.authService.id}`).subscribe(
      data => {
        this.usuarioActualizar.nombres = data.nombres;
        this.usuarioActualizar.apellidos = data.apellidos;
        this.usuarioActualizar.username = data.username;
        this.usuarioActualizar.mail = data.mail;
        console.log('usuario a actualizar:_', this.usuarioActualizar);
      },
      error => {
        console.error(error.message);
        alert(error.message);
      }
    );
  }

  // actualiza el estado de un usuario (solo admin)
  ActualizarEstadoUsuario(user: Usuario, status: string): void {
    const newStatus = status === 'Activo' ? 'Inactivo' : 'Activo'; // cambia el estado
    this.apiService.put<{ message: string }>(`usuarios/status/${user.idusuario}`, { status: newStatus }).subscribe(
      data => {
        this.loadUsuarios();
        alert(`el estado del usuario se ha actualizado a ${newStatus}`);
      },
      error => {
        console.error('error al actualizar el estado:', error.message);
        alert('error al actualizar el estado del usuario.');
      }
    );
  }

  // filtra la lista de usuarios según el término ingresado
  filterUsuarios(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement?.value || '';
    if (!searchTerm) {
      this.filteredUsuarios = [...this.usuarios];
      return;
    }
    this.filteredUsuarios = this.usuarios.filter(user =>
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
