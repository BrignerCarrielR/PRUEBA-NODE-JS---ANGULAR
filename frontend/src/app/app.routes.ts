import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {MantenimientoUsuarioComponent} from './components/mantenimiento-usuario/mantenimiento-usuario.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'mantenimiento_usuario', component: MantenimientoUsuarioComponent },
  { path: 'dashboard', component: DashboardComponent },
];

