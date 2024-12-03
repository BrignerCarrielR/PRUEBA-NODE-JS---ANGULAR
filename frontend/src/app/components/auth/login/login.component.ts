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
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  login() {
    console.log(this.dataLogin);
    this.apiService.post('login', this.dataLogin)
      .subscribe(
        (data: any) => {
          console.log(data)
          this.authService.loginUser(data.iduser,data.usuario,data.rol)
          window.location.href= '/inicio';
        },
        error => {
          console.error('Error al iniciar sesión:', error.message);
          alert(error.message);
        }
      );
  }


}
// securepassword
