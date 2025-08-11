import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, ProductoCreate } from '../models/producto.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly API_PRODUCTOS = `${environment.apiUrl.replace(/\/$/, '')}${
    environment.endpoints.productos
  }`;

  constructor(private http: HttpClient) {}

  createProducto(producto: ProductoCreate): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Creando producto en:', this.API_PRODUCTOS);
    }

    return this.http.post<{ message: string }>(this.API_PRODUCTOS, producto);
  }

  getProductos(): Observable<Producto[]> {
    if (!environment.production) {
      console.log('Obteniendo productos desde:', this.API_PRODUCTOS);
    }
    return this.http.get<Producto[]>(this.API_PRODUCTOS);
  }

  findProducto(codigo_producto: number): Observable<Producto> {
    if (!environment.production) {
      console.log('Buscando producto con código:', codigo_producto);
    }

    return this.http.get<Producto>(`${this.API_PRODUCTOS}/${codigo_producto}`);
  }

  deleteProducto(codigo_producto: number): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Eliminando producto con código:', codigo_producto);
    }

    return this.http.delete<{ message: string }>(
      `${this.API_PRODUCTOS}/${codigo_producto}`
    );
  }

  updateNombreProducto(
    codigo_producto: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Actualizando nombre del producto:', codigo_producto);
    }

    const body = { nombre: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_PRODUCTOS}/${codigo_producto}/nombre`,
      body
    );
  }

  updateMarcaProducto(
    codigo_producto: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Actualizando marca del producto:', codigo_producto);
    }

    const body = { marca: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_PRODUCTOS}/${codigo_producto}/marca`,
      body
    );
  }

  updateCostoProducto(
    codigo_producto: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log('Actualizando costo del producto:', codigo_producto);
    }

    const body = { costo: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_PRODUCTOS}/${codigo_producto}/costo`,
      body
    );
  }

  updateCantidadDisponibleProducto(
    codigo_producto: number,
    newValue: string
  ): Observable<{ message: string }> {
    if (!environment.production) {
      console.log(
        'Actualizando cantidad disponible del producto:',
        codigo_producto
      );
    }

    const body = { cantidad_disponible: newValue };

    return this.http.patch<{ message: string }>(
      `${this.API_PRODUCTOS}/${codigo_producto}/cantidad_disponible`,
      body
    );
  }

  missingProductos(): Observable<Producto[]> {
    if (!environment.production) {
      console.log('Obteniendo productos faltantes desde:', this.API_PRODUCTOS);
    }

    return this.http.get<Producto[]>(`${this.API_PRODUCTOS}/falta_stock`);
  }
}
