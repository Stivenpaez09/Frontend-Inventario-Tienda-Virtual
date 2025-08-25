import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login, ShowLogin } from '../models/login.model';
import { Observable } from 'rxjs';
import { logDev } from '../../../core/utils/logger.util';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API_LOGIN = `${environment.apiUrl.replace(
    /\/$/,
    ''
  )}${environment.endpoints.logins.replace(/\/$/, '')}`;

  constructor(private http: HttpClient) {}

  createLogin(login: Login): Observable<{ message: string }> {
    logDev(`Creando el login desde ${this.API_LOGIN}`);

    return this.http.post<{ message: string }>(this.API_LOGIN, login);
  }

  getLogins(): Observable<ShowLogin[]> {
    logDev(`Obteniendo los logins desde ${this.API_LOGIN}`);

    return this.http.get<ShowLogin[]>(this.API_LOGIN);
  }

  findLogin(id_login: number): Observable<ShowLogin> {
    logDev(`Buscando el login con ID ${id_login} desde ${this.API_LOGIN}`);

    return this.http.get<ShowLogin>(`${this.API_LOGIN}/${id_login}`);
  }

  deleteLogin(id_login: number): Observable<{ message: string }> {
    logDev(`Eliminando el login con ID ${id_login} desde ${this.API_LOGIN}`);

    return this.http.delete<{ message: string }>(
      `${this.API_LOGIN}/${id_login}`
    );
  }

  updateNombreLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando el nombre del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { nombre: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/nombre`,
      body
    );
  }

  updateApellidoLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando el apellido del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { apellido: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/apellido`,
      body
    );
  }

  updateFechaNacimientoLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando la fecha de nacimiento del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { fecha_nacimiento: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/fecha_nacimiento`,
      body
    );
  }

  updateTelefonoLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando el telefono del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { telefono: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/telefono`,
      body
    );
  }

  updateDireccionLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando la direccion del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { direccion: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/direccion`,
      body
    );
  }

  updatePasswordLogin(
    id_login: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando la contraseña del login con ID ${id_login} desde ${this.API_LOGIN}`
    );

    const body = { password: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/password`,
      body
    );
  }

  updateRolLogin(
    id_login: number,
    newValue: number
  ): Observable<{ message: string }> {
    logDev(
      `Actualizando el rol del login con ID ${id_login} a ${newValue} desde ${this.API_LOGIN}`
    );

    const body = { unRol: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_LOGIN}/${id_login}/rol`,
      body
    );
  }
}
