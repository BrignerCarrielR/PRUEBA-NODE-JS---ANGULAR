import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ApiService} from '../../api.service';
import {HttpClientModule} from '@angular/common/http';


interface MenuItem {
  nombreopcion: string;  // nombre del menú
  url: string;  // url del menú
}

interface Usuario {
  username: string,
  mail: string,
  usuarioestado: string,
  intentosfallidos: number,
  fechaingresosesion: string,
  fechacierresesion: string,
}

@Component({
  selector: 'app-inicio',
  standalone: true,  // Indicando que es un componente standalone
  imports: [CommonModule, RouterModule, HttpClientModule],  // Asegúrate de importar los módulos necesarios
  providers: [ApiService],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  usuario: Usuario = {
    username: '',
    mail: '',
    usuarioestado: '',
    intentosfallidos: 0,
    fechaingresosesion: '',
    fechacierresesion: '',
  };
  nombreUsuario: string | null = null;
  rol: string | null = null;
  urlactual: string;
  Islogin: boolean | null = null;

  // Definimos la propiedad 'menuItems'
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.nombreUsuario = this.authService.nombreUser;
    this.rol = this.authService.es_staff ? 'Administrador' : 'Usuario';
    this.urlactual = this.router.url
    this.getOpciones()
    this.getDatosBienvenida()
  }

  ngOnInit(): void {
    this.Islogin = this.authService.isLoggedIn;
    if (!this.Islogin) {
      window.location.href = '/';  // Redirigir si el usuario ya está logueado
    }
  }



  getDatosBienvenida() {
    this.apiService.get<Usuario>(`datos_bienvenida/${this.authService.id}`)
      .subscribe(
        data => {
          this.usuario = data;  // Aquí ya no necesitas un bucle, simplemente asigna los datos
          console.log(data);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }

  getOpciones() {
    this.apiService.get<MenuItem[]>(`menu_usuario/${this.authService.id}`)
      .subscribe(
        data => {
          this.menuItems = data;  // Aquí ya no necesitas un bucle, simplemente asigna los datos
          console.log(data);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }


  // Función para determinar si la URL actual corresponde con el enlace
  isActive(url: string): boolean {
    return this.urlactual === url;
  }
}

