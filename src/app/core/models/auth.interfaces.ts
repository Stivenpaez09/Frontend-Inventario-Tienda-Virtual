/**
 * Interface para la petición de login
 * Datos que se envían al backend para autenticación
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Interface para la respuesta del endpoint de login
 * Contiene únicamente el token JWT devuelto por el backend
 */
export interface LoginResponse {
  token: string;
}

/**
 * Interface para el payload decodificado del JWT
 * Representa la información contenida dentro del token
 */
export interface JwtPayload {
  roles: string[];
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Interface para representar el estado del usuario autenticado
 * Utilizada para el manejo de estado en la aplicación
 */
export interface AuthenticatedLogin {
  username: string;
  roles: string[];
  isAuthenticated: boolean;
}

/**
 * Enum para los roles de usuario disponibles en el sistema
 * Facilita el manejo de roles de forma type-safe
 */
export enum LoginRol {
  ADMINISTRADOR = 'ROLE_ADMINISTRADOR',
  ASISTENTE = 'ROLE_ASISTENTE',
}

/**
 * Interface para errores de autenticación
 * Estandariza el manejo de errores en el módulo de auth
 */
export interface AuthError {
  message: string;
  code?: number;
  details?: string;
}

// Interface para el perfil de usuario autenticado
export interface LoginProfile {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  cedula: string;
  direccion: string;
  username: string;
  rol: string;
}
