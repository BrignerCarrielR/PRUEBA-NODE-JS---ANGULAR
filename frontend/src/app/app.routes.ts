import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {PersonaComponent} from './components/admin/persona/persona.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {MantenimientoUsuarioComponent} from './components/admin/mantenimiento-usuario/mantenimiento-usuario.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'personas', component: PersonaComponent },
  { path: 'mantenimineto_usuarios', component: MantenimientoUsuarioComponent },
  { path: 'dashboard', component: DashboardComponent },
];

