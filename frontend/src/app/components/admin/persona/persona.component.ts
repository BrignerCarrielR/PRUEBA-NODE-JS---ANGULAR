import { Component, OnInit } from '@angular/core';
import { InicioComponent } from '../../inicio/inicio.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../../auth.service';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [InicioComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [ApiService],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit {
  listaPersonas: any[] = [];
  nuevaPersona: any = { Nombres: '', Apellidos: '', Identificacion: '', FechaNacimiento: '' };
  personaSeleccionada: any = null;
  personaFormulario = {
    Nombres: '',
    Apellidos: '',
    Identificacion: '',
    FechaNacimiento: ''
  };

  constructor(private apiService: ApiService, private authService: AuthService,) {}

  ngOnInit() {
    this.getListaPersonas();

    console.log(this.authService.es_staff)
    console.log(this.authService.id)
  }

  getListaPersonas() {
    this.apiService.get<any[]>('personas').subscribe(
      data => {
        console.log('Datos recibidos:', data);  // Imprime los datos para ver la estructura
        this.listaPersonas = data;
      },
      error => console.error('Error al obtener personas:', error)
    );
  }

  agregarPersona() {
    this.apiService.post<any>('personas', this.personaFormulario).subscribe(
      response => {
        console.log('Persona creada exitosamente', response);
        this.getListaPersonas(); // Refresca la lista de personas
        this.resetFormulario();  // Limpia el formulario
      },
      error => {
        console.error('Error al agregar persona:', error.message);
      }
    );
  }

  editarPersona() {
    if (this.personaSeleccionada) {
      console.log('Persona a editar:', this.personaFormulario);  // Verifica los datos antes de enviarlos
      // Usamos "identificacion" como identificador
      this.apiService.put<any>(`personas/${this.personaSeleccionada.idpersona}`, this.personaFormulario).subscribe(
        () => {
          this.getListaPersonas();
          this.resetFormulario();
        },
        error => {
          this.getListaPersonas();
          this.resetFormulario();
          console.error('Error al editar persona:', error);
        }
      );
    }
  }

  seleccionarPersona(persona: any) {
    this.personaSeleccionada = persona;
    // Clonamos los datos de la persona seleccionada para editarla
    this.personaFormulario = {
      Nombres: persona.nombres,
      Apellidos: persona.apellidos,
      Identificacion: persona.identificacion,
      FechaNacimiento: persona.fechanacimiento
    };
  }

  eliminarPersona(identificacion: string) {
    if (confirm('¿Está seguro de eliminar esta persona?')) {
      // Usamos "identificacion" para eliminar la persona
      this.apiService.get<any>(`personas/estado/${identificacion}`).subscribe(
        () => {
          this.getListaPersonas();
          this.resetFormulario();
        },
        error => {
          this.getListaPersonas();
          this.resetFormulario();
          console.error('Error al editar persona:', error);
        }
      );
    }
  }

  resetFormulario() {
    this.personaSeleccionada = null;
    // Resetea el formulario a los valores iniciales
    this.personaFormulario = this.nuevaPersona;
  }

  // Método para verificar si estamos en modo de edición
  isEditing() {
    return this.personaSeleccionada !== null;
  }
}
