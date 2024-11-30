import {Component} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';  // Asegúrate de que está importado
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../api.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../auth.service';  // Importa el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],  // Aquí agregamos HttpClientModule
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  dataLogin = {
    UserNameOrEmail: '',
    Password: ''
  }

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  login() {
    this.apiService.post('usuarios/login', this.dataLogin)
      .subscribe(
        (data: any) => {
          // Limpiamos el valor de 'status' usando trim() para quitar espacios extra
          const iduser = data.data.iduser;
          const usuario = data.data.usuario;
          const status = data.data.status.trim(); // Elimina los espacios adicionales

          console.log(iduser, usuario, status);  // Imprime los datos sin espacios extra

          // Verificamos que la respuesta tenga los datos esperados
          if (iduser && usuario && status) {
            // Iniciamos sesión con los datos recibidos
            this.authService.loginUser(iduser, usuario, status);
            console.log('Usuario logueado:', { iduser, usuario, status });
            window.location.href='/inicio'
          } else {
            console.error('Respuesta incompleta del servidor:', data);
            alert('Datos incompletos o erróneos recibidos del servidor.');
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión.');
        }
      );
  }


}
// securepassword
