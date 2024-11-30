import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { InicioComponent } from '../../inicio/inicio.component';

// Definimos la interfaz Usuario para que TypeScript reconozca correctamente las propiedades
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  estado: string;
  rol: string;
}

@Component({
  selector: 'app-mantenimiento-usuario',
  standalone: true,
  imports: [CommonModule, InicioComponent], // Asegúrate de incluir CommonModule
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.css']
})
export class MantenimientoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];  // Declaramos 'usuarios' con tipo explícito 'Usuario[]'
  filteredUsuarios: Usuario[] = [];
  isAdmin: boolean = true;  // Simulando que el usuario es administrador
  selectedFile: any = null;

  constructor() { }

  ngOnInit(): void {
    this.loadUsuarios();  // Cargar los usuarios iniciales
  }

  // Simular usuarios para la demostración
  loadUsuarios(): void {
    this.usuarios = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@correo.com', estado: 'Activo', rol: 'Usuario' },
      { id: 2, nombre: 'Carlos Gómez', email: 'carlos@correo.com', estado: 'Inactivo', rol: 'Admin' },
      { id: 3, nombre: 'Ana Rodríguez', email: 'ana@correo.com', estado: 'Activo', rol: 'Usuario' },
    ];
    this.filteredUsuarios = [...this.usuarios];
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
            user.id = row[index];
            break;
          case 'nombre':
            user.nombre = row[index];
            break;
          case 'email':
            user.email = row[index];
            break;
          case 'estado':
            user.estado = row[index];
            break;
          case 'rol':
            user.rol = row[index];
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
    if (this.isAdmin || user.rol !== 'Admin') {
      // Lógica para permitir que el administrador actualice datos de otros usuarios, pero no sus propios datos
      const index = this.usuarios.findIndex(u => u.id === user.id);
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
      const index = this.usuarios.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.usuarios[index].estado = status;
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
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}

