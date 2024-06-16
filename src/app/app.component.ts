import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inscripcion, Estudiante, Asignatura, Profesor, Grupo, InfoInscripcion, InfoEstudiante } from './inscripcion';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  data: Inscripcion[] = [];
  private http = inject(HttpClient);

  constructor() { }

  ngOnInit(): void {
    this.http
      .get<Inscripcion[]>('assets/inscripciones.json')
      .subscribe((response: Inscripcion[]) => {
        console.log(response);
        this.data = response;
        console.log(this.getEstudiantes())
        console.log(this.getInfoEstudiante('851255'))
        console.log(this.getInfoEstudiantes())

           // … otras pruebas …
      });
  }


  //Punto 12
  getEstudiantes(): Estudiante[] {
    return [...new Map(
      this.data.map(item => [item.estudiante.nombre, item.estudiante])).values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  //Punto 13
  getInfoEstudiante(codigo: string): InfoEstudiante {
    // Utilice Array.filter() para obtener solo las inscripciones del estudiante cuyo código se proporciona
    const inscripciones: Inscripcion[] = this.data.filter(inscripcion => inscripcion.estudiante.codigo === codigo);

    // Asignar el estudiante de la primera inscripción
    const estudiante: Estudiante = inscripciones[0]?.estudiante

    const info: InfoInscripcion[] = inscripciones.map(inscripcion => ({
      grupo: inscripcion.grupo,
      notas: inscripcion.notas,
      definitiva: inscripcion.definitiva,
      inasistencia: inscripcion.inasistencia
    }));


    // Calcular el promedio y el rendimiento
    const promedio: number = this.getPromedio(info);
    const rendimiento: string = this.getRendimiento(promedio);

    // Retornar el objeto InfoEstudiante
    return { estudiante, info, promedio, rendimiento };
  }


  getPromedio(info: InfoInscripcion[]): number {
    let suma = 0
    const callback = (inscripcion: InfoInscripcion) => inscripcion.definitiva;
    info.forEach(inscripcion => suma += callback(inscripcion))
    return info.length ? suma / info.length : 0

  }

  getRendimiento(promedio: number): string {
    if (promedio < 3) return 'Deficiente';
    if (promedio < 3.4) return 'Regular';
    if (promedio < 3.9) return 'Aceptable';
    if (promedio < 4.4) return 'Bueno';
    return 'Sobresaliente';
    
  }
  //Punto 14
  getInfoEstudiantes(): InfoEstudiante[] {
    return this.getEstudiantes().map(estudiante => this.getInfoEstudiante(estudiante.codigo));
  }

  getDataEstudiante(codigo: string): boolean {
    console.log(this.getInfoEstudiante(codigo));
    return false;
  }

  getDataGrupo(codigo: string): boolean {
    const inscripcion = this.data.find(item => item.grupo.codigo === codigo);
    if (inscripcion) {
      console.log(inscripcion.grupo);
      return false;
    } else {
      console.log('Grupo no encontrado');
      return false;
    }
    
  }

}
