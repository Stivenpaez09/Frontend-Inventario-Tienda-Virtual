import { Cliente } from '../../clientes/models/cliente.model';
import { Producto } from '../../productos/models/producto.model';

export interface Venta {
  codigo_venta: number;
  fecha_venta: string;
  total: number;
  listaProductos: Producto[];
  unCliente: Cliente;
}

export interface VentaCreate {
  fecha_venta: string;
  listaProductos: { codigo_producto: number }[];
  unCliente: { id_cliente: number };
}

export interface BiggestVenta {
  codigo_venta: number;
  total: number;
  listaProductos: number;
  nombreCliente: string;
  apellidoCliente: string;
}

export interface ShowVentas {
  codigo_venta: number;
  nombreCliente: string;
  cedulaCliente: string;
  fecha_venta: string;
  cantidadProductos: number;
  total: number;
}
