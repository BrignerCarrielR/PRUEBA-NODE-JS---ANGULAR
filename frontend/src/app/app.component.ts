import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login: boolean;
  nombreUsuario: any;
  es_staff: boolean=false;
  constructor(private authService: AuthService, private apiService: ApiService) {
    this.login = this.authService.isLoggedIn;
    this.nombreUsuario = this.authService.nombreUser;
    this.es_staff = this.authService.es_staff;
    console.log(this.authService.nombreUser);
  }

  CerrarSesion() {
    this.apiService.get(`logout/${this.authService.id}`)
      .subscribe(
        (data: any) => {
          alert(data.message)
          this.authService.logoutUser();
          window.location.href="/";
        },
        error => {
          console.error(error.message);
          alert(error.message)
        }
      );

  }
}
