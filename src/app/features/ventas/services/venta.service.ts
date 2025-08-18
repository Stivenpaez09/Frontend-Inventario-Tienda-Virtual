import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BiggestVenta,
  ShowVentas,
  TotalVentasDiarias,
  Venta,
} from '../models/venta.model';
import { Observable } from 'rxjs';
import { logDev } from '../../../core/utils/logger.util';
import { environment } from '../../../../environments/environment';
import { Producto } from '../../productos/models/producto.model';
import { Cliente } from '../../clientes/models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private readonly API_VENTAS = `${environment.apiUrl.replace(/\/$/, '')}${
    environment.endpoints.ventas
  }`;

  constructor(private http: HttpClient) {}

  // Llama al backend para registrar una nueva venta y devolver un mensaje de confirmación
  createVenta(venta: Venta): Observable<{ message: string }> {
    //Solo mostramos el Log si no estamos en produccion para verificar que todo funcione correctamente
    logDev('Creando la venta desde: ', this.API_VENTAS);
    return this.http.post<{ message: string }>(this.API_VENTAS, venta);
  }

  //Llama al backend para obtener una lista de todas las ventas en la DB
  getVentas(): Observable<Venta[]> {
    logDev('Obteniendo la lista de ventas desde: ', this.API_VENTAS);

    return this.http.get<Venta[]>(this.API_VENTAS);
  }

  getShowVentas(): Observable<ShowVentas[]> {
    logDev(
      'Obteniendo la lista de ventas desde: ',
      `${this.API_VENTAS}/verventas`
    );

    return this.http.get<ShowVentas[]>(`${this.API_VENTAS}/verventas`);
  }

  //Llama al backend para obtener una venta con un Id en especifico
  findVenta(codigo_venta: number): Observable<Venta> {
    logDev('Obteniendo la venta desde: ', `${this.API_VENTAS}/${codigo_venta}`);

    return this.http.get<Venta>(`${this.API_VENTAS}/${codigo_venta}`);
  }

  //Llama al backen para eliminar una venta en especifico basandose en su ID
  deleteVenta(codigo_venta: number): Observable<{ message: string }> {
    logDev('Eliminando la venta desde: ', `${this.API_VENTAS}/${codigo_venta}`);

    return this.http.delete<{ message: string }>(
      `${this.API_VENTAS}/${codigo_venta}`
    );
  }

  //Llama al backend para actualizar la fecha de una venta en especifico
  updateFechaVenta(
    codigo_venta: number,
    newValue: string
  ): Observable<{ message: string }> {
    logDev(
      'Actualizando la fecha de venta desde: ',
      `${this.API_VENTAS}/${codigo_venta}/fechaventa`,
      ` a ${newValue}`
    );

    const body = { fecha_venta: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_VENTAS}/${codigo_venta}/fechaventa`,
      body
    );
  }

  //Llama al backend para actualizar la lista de productos de una venta en especifico
  updateListaProductosVenta(
    codigo_venta: number,
    newList: Producto[]
  ): Observable<{ message: string }> {
    logDev(
      'Actualizando la lista de productos de la venta desde: ',
      `${this.API_VENTAS}/${codigo_venta}/listaproductos`,
      ` a ${newList}`
    );

    const body = { listaProductos: newList };

    return this.http.patch<{ message: string }>(
      `${this.API_VENTAS}/${codigo_venta}/listaproductos`,
      body
    );
  }

  //Llama al backend para actualizar al cliente que realizó una venta en especifico
  updateClienteVenta(
    codigo_venta: number,
    newObject: Cliente
  ): Observable<{ message: string }> {
    logDev(
      'Actualizando el cliente de la venta desde: ',
      `${this.API_VENTAS}/${codigo_venta}/cliente`,
      ` a ${newObject}`
    );

    const body = { unCliente: newObject };

    return this.http.patch<{ message: string }>(
      `${this.API_VENTAS}/${codigo_venta}/cliente`,
      body
    );
  }

  //Llama al backend para obtener una lista con todos los productos que contiene una venta en especifico
  findProductosVenta(codigo_venta: number): Observable<{ message: string }> {
    logDev(
      'Obteniendo los productos de la venta desde: ',
      `${this.API_VENTAS}/${codigo_venta}/productos`
    );

    return this.http.get<{ message: string }>(
      `${this.API_VENTAS}/${codigo_venta}/productos`
    );
  }

  //Llama al backend para que de un informe general sobre la ventas realizadas en un dia en especifico y el dinero total recaudado
  findVentasByDate(fecha_venta: string): Observable<TotalVentasDiarias> {
    logDev(
      'Obteniendo las ventas por fechas desde: ',
      `${this.API_VENTAS}/fecha/${fecha_venta}`
    );

    return this.http.get<TotalVentasDiarias>(
      `${this.API_VENTAS}/fecha/${fecha_venta}`
    );
  }

  //Llama al backend para obtener la venta mas grande realizada en la app en general
  findBiggestVenta(): Observable<BiggestVenta> {
    logDev(
      'Obteniendo la venta mas grande desde: ',
      `${this.API_VENTAS}/mayorventa`
    );

    return this.http.get<BiggestVenta>(`${this.API_VENTAS}/mayorventa`);
  }
}
