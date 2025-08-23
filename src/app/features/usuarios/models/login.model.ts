export interface Login {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  telefono: string;
  cedula: string;
  direccion: string;
  username: string;
  password: string;
  unRol: number;
}

export interface ShowLogin {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  cedula: string;
  direccion: string;
  username: string;
  rol: string;
}
