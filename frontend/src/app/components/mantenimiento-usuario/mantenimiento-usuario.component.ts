import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import {ParseResult} from 'papaparse';
import {InicioComponent} from '../inicio/inicio.component';
import {AuthService} from '../../auth.service';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';

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

interface ApiResponse {
  resultados: {
    usuario: string;
    mensaje: string;
  }[];
}

@Component({
  selector: 'app-mantenimiento-usuario',
  standalone: true,
  imports: [CommonModule, InicioComponent, FormsModule], // Asegúrate de incluir CommonModule
  providers: [ApiService],
  templateUrl: './mantenimiento-usuario.component.html',
  styleUrls: ['./mantenimiento-usuario.component.css']
})
export class MantenimientoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  usuarios_excel: any[] = [];
  idlogin: number | null = null;
  isAdmin: boolean | null = null;
  selectedFile: any = null;
  usuarioActualizar = {
    id:0,
    nombres: '',
    apellidos: '',
    username: '',
    mail: ''
  }
  EstadoActualizarUsuario: boolean = false

  constructor(private authService: AuthService, private apiService: ApiService, private route: ActivatedRoute) {
    this.isAdmin = this.authService.es_staff;
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.getDatosUsuario()
    console.log(this.isAdmin);
  }

  // ROL: ADMINISTRADOR
  loadUsuarios(): void {
    this.apiService.get<Usuario[]>(`usuarios`)
      .subscribe(
        data => {
          this.usuarios = data;
          this.filteredUsuarios = data;
          console.log('Usuarios', this.usuarios);
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
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0]; // Cargar la primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});  // 'header: 1' usa la primera fila como cabecera
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
    const headers = data[0]; // Cabeceras del archivo (primera fila)
    this.usuarios_excel = data.slice(1).map((fila: any) => {
      const usuario: Usuario = {} as Usuario;

      // Mapear los valores a las propiedades del usuario
      headers.forEach((encabezado: string, indice: number) => {
        switch (encabezado.toLowerCase()) {
          case 'nombres':
            usuario.nombres = fila[indice] || '';
            break;
          case 'apellidos':
            usuario.apellidos = fila[indice] || '';
            break;
          case 'identificación':
            usuario.identificacion = fila[indice] || '';
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

    console.log(`${this.usuarios_excel.length} usuarios cargados desde el archivo:`, this.usuarios_excel);
    alert(`${this.usuarios_excel.length} usuarios importados correctamente.`);
    this.insertUsuario()
  }


  insertUsuario(): void {
    if (this.usuarios_excel.length === 0) {
      alert('No hay datos para enviar a la API. Importa un archivo primero.');
      return;
    }

    this.apiService.post<ApiResponse>(`usuarios_excel`, this.usuarios_excel)
      .subscribe(
        (data: ApiResponse) => {
          console.log('Datos enviados a la API:', data);

          if (data.resultados && Array.isArray(data.resultados)) {
            const mensajes = data.resultados.map(
              (resultado) =>
                `Usuario: ${resultado.usuario}\nMensaje: ${resultado.mensaje}`
            ).join('\n\n');

            alert('RESPUESTA DE LA API\n\n' + mensajes);
          } else {
            console.error('Estructura inesperada en la respuesta:', data);
            alert('La respuesta de la API no tiene el formato esperado.');
          }

          this.loadUsuarios();
        },
        error => {
          console.error('Error al enviar datos a la API:', error.message);
          alert('Error al enviar los datos a la API.');
        }
      );

  }


  // Actualizar los datos del usuario
  ActualizarUsuarios(){
    this.putUsuarios()
  }

  SelectActualizarUsuarios(usuario:any): void {
    console.log(usuario)
    this.usuarioActualizar.id = usuario.idusuario;
    this.usuarioActualizar.nombres = usuario.nombres;
    this.usuarioActualizar.apellidos = usuario.apellidos;
    this.usuarioActualizar.username = usuario.username;
    this.usuarioActualizar.mail = usuario.mail;
    this.EstadoActualizarUsuario = true
    console.log('Usuario a actualizar:', this.usuarioActualizar)
  }
  putUsuarios() {
    this.apiService.put<{ message: string }>(`usuarios/${this.usuarioActualizar.id}`, this.usuarioActualizar)
      .subscribe(
        data => {
          console.log('Datos enviados a la API:', data);
          this.loadUsuarios();
          alert(data.message)
        },
        error => {
          console.error('Error al enviar datos a la API:', error.message);
          alert('Error al enviar los datos a la API.');
        }
      );
  }


  // Cambiar estado de usuario (solo admin)
  ActuzalizarEstado(user: Usuario, status: string): void {
    console.log(user.idusuario, status)
    this.apiService.put<{ message: string }>(`usuarios_status/${user.idusuario}`, {status})
      .subscribe(
        data => {
          console.log('Datos enviados a la API:', data);
          this.loadUsuarios();
          alert(data.message)
        },
        error => {
          console.error('Error al enviar datos a la API:', error.message);
          alert('Error al enviar los datos a la API.');
        }
      );
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


  // ROL: USUARIO
  ActualizarUsuario() {
    console.log(this.usuarioActualizar)
    this.putUsuario()
  }

  getDatosUsuario(): void {
    this.apiService.get<any>(`usuarios/${this.authService.id}`)
      .subscribe(
        data => {
          this.usuarioActualizar.nombres = data.nombres;
          this.usuarioActualizar.apellidos = data.apellidos;
          this.usuarioActualizar.username = data.username;
          this.usuarioActualizar.mail = data.mail;
          console.log('Usuario a actualizar:_', this.usuarioActualizar);
        },
        error => {
          console.error(error.message);
          alert(error.message);
        }
      );
  }

  putUsuario() {
    this.apiService.put<{ message: string }>(`usuarios/${this.authService.id}`, this.usuarioActualizar)
      .subscribe(
        data => {
          console.log('Datos enviados a la API:', data);
          this.getDatosUsuario()
          this.loadUsuarios();
          alert(data.message)
        },
        error => {
          console.error('Error al enviar datos a la API:', error.message);
          alert('Error al enviar los datos a la API.');
        }
      );
  }
}

