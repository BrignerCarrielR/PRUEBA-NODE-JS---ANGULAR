import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { ApiService } from '../../../api.service';
import { InicioComponent } from '../../inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

interface Usuario {
  idusuario: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  mail: string;
  rolname: string;
  status: string;
  username: string;
  password: string;
}

interface RespuestaApi {
  resultados: {
    usuario: string;
    mensaje: string;
  }[];
}

@Component({
  selector: 'app-ingreso-masivo-usuario',
  standalone: true,
  imports: [InicioComponent, HttpClientModule, CommonModule],
  providers: [ApiService],
  templateUrl: './ingreso-masivo-usuario.component.html',
  styleUrls: ['./ingreso-masivo-usuario.component.css']
})
export class IngresoMasivoUsuarioComponent {
  usuariosExcel: any[] = [];
  archivoSeleccionado: any = null;
  usuariosImportados: { usuario: string, mensaje: string }[] = [];
  mostrarFormulario: boolean = true;

  constructor(private apiService: ApiService) { }

  // Cargar el archivo Excel o CSV
  onArchivoCambio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input?.files?.[0];

    if (archivo && (archivo.name.endsWith('.xlsx') || archivo.name.endsWith('.csv'))) {
      this.archivoSeleccionado = archivo;
      archivo.name.endsWith('.xlsx') ? this.leerArchivoExcel(archivo) : this.leerArchivoCSV(archivo);
    } else {
      alert('Por favor, selecciona un archivo válido (xlsx o csv).');
    }
  }

  // Leer archivo Excel
  leerArchivoExcel(archivo: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Cargar la primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });  // 'header: 1' usa la primera fila como cabecera
      this.importarUsuarios(jsonData);
    };
    reader.readAsArrayBuffer(archivo);
  }

  // Leer archivo CSV
  leerArchivoCSV(archivo: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvData = e.target.result;
      Papa.parse(csvData, {
        complete: (result: any) => { // Especificar el tipo ParseResult
          this.importarUsuarios(result.data);  // 'result.data' es el array con las filas del CSV
        }
      });
    };
    reader.readAsText(archivo);
  }

  // Importar los usuarios desde el archivo
  importarUsuarios(datos: any): void {
    const encabezados = datos[0]; // Cabeceras del archivo (primera fila)

    // Filtrar las filas vacías (por ejemplo, donde todos los valores son nulos o vacíos)
    this.usuariosExcel = datos.slice(1).filter((fila: any) => fila.some((valor: any) => valor !== undefined && valor !== null && valor !== ''));

    this.usuariosExcel = this.usuariosExcel.map((fila: any) => {
      const usuario: Usuario = {} as Usuario;

      // Mapear los valores a las propiedades del usuario
      encabezados.forEach((encabezado: string, indice: number) => {
        switch (encabezado.toLowerCase()) {
          case 'nombres':
            usuario.nombres = fila[indice] || '';
            break;
          case 'apellidos':
            usuario.apellidos = fila[indice] || '';
            break;
          case 'identificacion':
            usuario.identificacion = fila[indice].toString() || '';
            break;
          case 'username':
            usuario.username = fila[indice] || '';
            break;
          case 'password':
            usuario.password = fila[indice] || '';
            break;
          default:
            console.warn(`Campo desconocido: ${encabezado}`);
        }
      });

      return usuario;
    });

    console.log(`${this.usuariosExcel.length} usuarios cargados desde el archivo:`, this.usuariosExcel);
    alert(`${this.usuariosExcel.length} usuarios importados correctamente.`);
    this.insertarUsuarios();
  }



  insertarUsuarios(): void {
    if (this.usuariosExcel.length === 0) {
      alert('No hay datos para enviar a la API. Importa un archivo primero.');
      return;
    }

    this.apiService.post<RespuestaApi>(`usuarios/excel`, this.usuariosExcel)
      .subscribe(
        (data: RespuestaApi) => {
          console.log('Datos recibido desde la API:', data);

          if (data.resultados && Array.isArray(data.resultados)) {
            // Almacenamos los resultados en la propiedad usuariosImportados
            this.usuariosImportados = data.resultados.map(
              (resultado) => ({
                usuario: resultado.usuario,
                mensaje: resultado.mensaje
              })
            );
            this.mostrarFormulario = false;
          } else {
            console.error('Estructura inesperada en la respuesta:', data);
            alert('La respuesta de la API no tiene el formato esperado.');
          }
        },
        error => {
          console.error('Error al enviar datos a la API:', error.message);
          alert('Error al enviar los datos a la API.');
        }
      );
  }

  ingresarNuevoArchivo(): void {
    this.usuariosImportados = [];
    this.usuariosExcel = [];
    this.mostrarFormulario = true; // Mostrar el formulario nuevamente
  }

}

