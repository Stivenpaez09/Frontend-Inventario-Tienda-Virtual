export interface Producto {
  codigo_producto: number;
  nombre: string;
  marca: string;
  costo: number;
  cantidad_disponible: number;
}

export type ProductoCreate = Omit<Producto, 'codigo_producto'>;
