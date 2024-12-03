import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { InicioComponent } from '../inicio/inicio.component';
import {AuthService} from '../../auth.service';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';

interface Usuario {
  idusuario: number;
  nombres: string;
  apellidos: string;
  mail: string;
  rolname: string;
  status: string;
  username: string;
}

@Component({
  selector: 'app-mantenimiento-usuario',
  standalone: true,
  imports: [CommonModule, InicioComponent], // Asegúrate de incluir CommonModule
  providers: [ApiService],
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.css']
})
export class MantenimientoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  idlogin: number | null = null;
  isAdmin: boolean = true;
  selectedFile: any = null;

  constructor( private authService: AuthService, private apiService: ApiService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.idlogin = this.authService.id;
  }

  // Simular usuarios para la demostración
  loadUsuarios(): void {
    this.apiService.get<Usuario[]>(`usuarios`)
      .subscribe(
        data => {
          this.usuarios = data;
          this.filteredUsuarios = data;
          console.log('Usuarios',this.usuarios);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }

  // Cargar el archivo Excel o CSV
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      this.selectedFile = file;
      file.name.endsWith('.xlsx') ? this.readExcelFile(file) : this.readCSVFile(file);
    } else {
      alert('Por favor, selecciona un archivo válido (xlsx o csv).');
    }
  }

  // Leer archivo Excel
  readExcelFile(file: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Cargar la primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });  // 'header: 1' usa la primera fila como cabecera
      this.importUsers(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  // Leer archivo CSV
  readCSVFile(file: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvData = e.target.result;
      Papa.parse(csvData, {
        complete: (result: ParseResult<any>) => { // Especificar el tipo ParseResult
          this.importUsers(result.data);  // 'result.data' es el array con las filas del CSV
        }
      });
    };
    reader.readAsText(file);
  }

  // Importar los usuarios desde el archivo
  importUsers(data: any): void {
    const headers = data[0];  // Cabeceras del archivo (suponiendo que la primera fila tiene los nombres de las columnas)
    const usuariosFromFile: Usuario[] = data.slice(1).map((row: any) => {
      const user: Usuario = {} as Usuario;

      // Asegurarse de que las cabeceras coincidan con las propiedades de la interfaz 'Usuario'
      headers.forEach((header: string, index: number) => {
        switch(header.toLowerCase()) {
          case 'id':
            user.idusuario = row[index];
            break;
          case 'nombre':
            user.nombres = row[index];
            break;
          case 'email':
            user.mail = row[index];
            break;
          case 'estado':
            user.status = row[index];
            break;
          case 'rol':
            user.rolname = row[index];
            break;
        }
      });

      return user;
    });
    this.usuarios.push(...usuariosFromFile);
    this.filteredUsuarios = [...this.usuarios];
  }

  // Actualizar los datos del usuario
  updateUser(user: Usuario): void {
    if (this.isAdmin || user.rolname !== 'Admin') {
      // Lógica para permitir que el administrador actualice datos de otros usuarios, pero no sus propios datos
      const index = this.usuarios.findIndex(u => u.idusuario === user.idusuario);
      if (index !== -1) {
        this.usuarios[index] = user;
        alert('Usuario actualizado exitosamente');
      }
    } else {
      alert('No puedes actualizar los datos de otro administrador');
    }
  }

  // Cambiar estado de usuario (solo admin)
  updateUserStatus(user: Usuario, status: string): void {
    if (this.isAdmin) {
      const index = this.usuarios.findIndex(u => u.idusuario === user.idusuario);
      if (index !== -1) {
        this.usuarios[index].status = status;
        alert('Estado del usuario actualizado');
      }
    }
  }

  // Filtrar usuarios por nombre o email
  filterUsuarios(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement?.value || '';

    if (!searchTerm) {
      this.filteredUsuarios = [...this.usuarios];
      return;
    }

    this.filteredUsuarios = this.usuarios.filter(user =>
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}

