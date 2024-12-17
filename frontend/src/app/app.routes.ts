import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {MantenimientoUsuarioComponent} from './components/mantenimiento-usuario/mantenimiento-usuario.component';
import {ResetPasswordComponent} from './components/auth/reset-password/reset-password.component';
import {RolUsuarioComponent} from './components/admin/rol-usuario/rol-usuario.component';
import {IngresoMasivoUsuarioComponent} from './components/admin/ingreso-masivo-usuario/ingreso-masivo-usuario.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'mantenimiento_usuario', component: MantenimientoUsuarioComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reset_password', component: ResetPasswordComponent },
  { path: 'asignar_rol', component: RolUsuarioComponent },
  { path: 'ingreso_masivo', component: IngresoMasivoUsuarioComponent },
];

