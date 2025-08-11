import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cliente, ClienteCreate } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly API_CLIENTES = `${environment.apiUrl.replace(/\/$/, '')}${
    environment.endpoints.clientes
  }`;

  constructor(private http: HttpClient) {}

  createCliente(cliente: ClienteCreate): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Creando clientes en: ', this.API_CLIENTES);
    }

    return this.http.post<{ message: string }>(this.API_CLIENTES, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    if (!environment.production) {
      console.log('Obteniendo los clientes de: ', this.API_CLIENTES);
    }

    return this.http.get<Cliente[]>(this.API_CLIENTES);
  }

  findCliente(id_cliente: number): Observable<Cliente> {
    if (!environment.production) {
      console.log(
        `Buscando cliente con ID: ${id_cliente} en: ${this.API_CLIENTES}`
      );
    }

    return this.http.get<Cliente>(`${this.API_CLIENTES}/${id_cliente}`);
  }

  deleteCliente(id_cliente: number): Observable<{ message: string }> {
    if (!environment.production) {
      console.log(
        `Eliminando cliente con ID: ${id_cliente} en: ${this.API_CLIENTES}`
      );
    }

    return this.http.delete<{ message: string }>(
      `${this.API_CLIENTES}/${id_cliente}`
    );
  }

  updateNombreCliente(
    id_cliente: number,
    newValue: string
  ): Observable<{ mesagge: string }> {
    if (!environment.production) {
      console.log(
        `Actualizando nombre del cliente con ID: ${id_cliente} a: ${newValue} en: ${this.API_CLIENTES}`
      );
    }

    const body = { nombre: newValue };

    return this.http.patch<{ mesagge: string }>(
      `${this.API_CLIENTES}/${id_cliente}/nombre`,
      body
    );
  }

  updateApellidoCliente(
    id_cliente: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log(
        `Actualizando apellido del cliente con ID: ${id_cliente} a: ${newValue} en: ${this.API_CLIENTES}`
      );
    }

    const body = { apellido: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_CLIENTES}/${id_cliente}/apellido`,
      body
    );
  }

  updateCedulaCliente(
    id_cliente: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log(
        `Actualizando cédula del cliente con ID: ${id_cliente} a: ${newValue} en: ${this.API_CLIENTES}`
      );
    }

    const body = { cedula: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_CLIENTES}/${id_cliente}/cedula`,
      body
    );
  }
}
