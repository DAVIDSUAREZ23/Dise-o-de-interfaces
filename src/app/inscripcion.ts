//Punto 3
export type Estudiante = {
  identificacion: string;
  codigo: string;
  nombre: string;
  semestre: number;
};

export type Asignatura = {
  codigo: string;
  nombre: string;
  cuantitativa: boolean;
  horas: number;
// los mismos atributos que en la versión anterior
};

export type Profesor = {
  identificacion: string;
  nombre: string;
  correo: string;
// los mismos atributos que en la versión anterior
};

export type Grupo = {
codigo: string;
  anio: number;
  periodo: number;
  cupo: number;
  horario: string;
  semanas: number;
  horasSemana: number;
asignatura: Asignatura;
profesor: Profesor;
};

export type Inscripcion = {
  notas: number[];
  definitiva: number;
  inasistencia: number;
  estudiante: Estudiante;
  grupo: Grupo;
// con los atributos: estudiante, grupo, notas, definitiva y asistencia,
// teniendo en cuenta que ya existen los tipos Estudiante y Grupo
};

export type InfoInscripcion = {
grupo: Grupo;
notas: number[];
definitiva: number;
inasistencia: number;
};


// la información de un estudiante consta de sus datos personales, un array de sus
// inscripciones (InfoInscripcion[]), su promedio y su rendimiento
export type InfoEstudiante = {
estudiante:Estudiante;
info: InfoInscripcion[];
promedio?: number; // el promedio de las definitivas
rendimiento?: string; // deficiente < 3, regular < 3.4, aceptable < 3.9, bueno < 4.4, sobresaliente
};