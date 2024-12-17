import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  dataRecuperar = {
    nombres: '',
    apellidos: '',
    username: '',
    mail: ''

  }
  constructor(private authService: AuthService, private apiService: ApiService) {}

  RecuperarContrasena(){
    console.log(this.dataRecuperar);
    this.postRecuperarContrasena()
  }

  postRecuperarContrasena(): void {
    console.log(this.dataRecuperar);
    this.apiService.post<{ message: string }>('auth/recuperar_contrasena', this.dataRecuperar)
      .subscribe(
        (data: any) => {
          alert(data.message)
        },
        error => {
          console.error('Error al iniciar sesión:', error.message);
          alert(error.message);
        }
      );
  }
}
