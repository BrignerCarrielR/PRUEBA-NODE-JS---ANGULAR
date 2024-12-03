import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _login: boolean = false;
  private _idUser: number | null = null;
  private _nombreUser: string | null = null;
  private _es_staff: boolean = false; // Cambiado a booleano, inicializado como false

  constructor() {
    // Recuperar datos de localStorage y convertir según sea necesario
    this._idUser = localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')!, 10) : null;
    this._login = this._idUser !== null;
    this._nombreUser = localStorage.getItem('nombre_usuario');

    // Recuperar el valor de 'staff' y convertir a booleano
    const staff = localStorage.getItem('staff');
    this._es_staff = staff === 'true'; // Convertir 'staff' a booleano (si es 'true' o 'false')
  }

  get isLoggedIn(): boolean {
    return this._login;
  }

  get id(): number | null {
    return this._idUser;
  }

  get nombreUser(): string | null {
    return this._nombreUser;
  }

  get es_staff(): boolean {
    return this._es_staff;
  }

  loginUser(id: number, username: string, rol: string): void {
    // Limpiar el valor de es_staff y convertirlo a booleano
    this._idUser = id;
    this._nombreUser = username;
    this._login = true;

    // Aquí puedes limpiar los espacios en es_staff y convertirlo a booleano
    this._es_staff = rol === 'Administrador'; // Si 'A' -> true, si 'I' -> false

    // Guardar los datos en localStorage
    localStorage.setItem('user_id', id.toString());
    localStorage.setItem('nombre_usuario', username);
    localStorage.setItem('staff', this._es_staff.toString());

    console.log("Iniciando sesión:", { id, username, rol });
  }

  logoutUser(): void {
    this._idUser = null;
    this._login = false;
    this._nombreUser = '';
    this._es_staff = false; // Aseguramos que al cerrar sesión se limpie también el staff

    localStorage.removeItem('user_id');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('staff');
    console.log("Cerrando sesión");
  }
}
