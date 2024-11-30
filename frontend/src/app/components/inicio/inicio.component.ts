import { Component } from '@angular/core';
import {AuthService} from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  nombreUsuario: any;
  urlactual: string;
  constructor(private authService: AuthService, private router: Router) {
    this.nombreUsuario = this.authService.nombreUser;
    this.urlactual = this.router.url;
  }

  // Función para determinar si la URL actual corresponde con el enlace
  isActive(url: string): boolean {
    return this.urlactual === url;
  }
}
