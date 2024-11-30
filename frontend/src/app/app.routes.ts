import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {PersonaComponent} from './components/admin/persona/persona.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'personas', component: PersonaComponent },
];

