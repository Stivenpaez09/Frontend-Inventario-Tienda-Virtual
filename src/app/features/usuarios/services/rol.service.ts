import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';
import { logDev } from '../../../core/utils/logger.util';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private readonly API_ROL = `${environment.apiUrl.replace(
    /\/$/,
    ''
  )}${environment.endpoints.roles.replace(/\/$/, '')}`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    logDev(`Obteniendo los roles desde ${this.API_ROL}`);

    return this.http.get<Rol[]>(this.API_ROL);
  }
}
