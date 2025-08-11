export interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  cedula: string;
}

export type ClienteCreate = Omit<Cliente, 'id_cliente'>;
