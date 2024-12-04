import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  // Implementa OnInit
  Islogin: boolean | null = null;

  dataLogin = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.Islogin = this.authService.isLoggedIn;
    if (this.Islogin) {
      window.location.href = '/inicio';  // Redirigir si el usuario ya está logueado
    }
  }

  login() {
    console.log(this.dataLogin);
    this.apiService.post('login', this.dataLogin)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.authService.loginUser(data.iduser, data.usuario, data.rol);
          window.location.href = '/inicio';  // Redirigir a la página de inicio después de un login exitoso
        },
        error => {
          console.error('Error al iniciar sesión:', error.message);
          alert(error.message);
        }
      );
  }
}

