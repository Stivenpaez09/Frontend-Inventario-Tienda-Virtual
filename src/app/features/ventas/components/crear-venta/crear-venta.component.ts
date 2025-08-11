import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Cliente } from '../../../clientes/models/cliente.model';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ProductoService } from '../../../productos/services/producto.service';
import { MessageService } from '../../../../core/services/message.service';
import { Router } from '@angular/router';
import { Producto } from '../../../productos/models/producto.model';
import { VentaCreate } from '../../models/venta.model';

@Component({
  selector: 'app-crear-venta',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './crear-venta.component.html',
  styleUrl: './crear-venta.component.scss',
})
export class CrearVentaComponent implements OnInit {
  form: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CrearVentaComponent>,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private message: MessageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      unCliente: [null, Validators.required],
      fecha_venta: ['', Validators.required],
      listaProductos: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClientes();
    this.getProductos();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al cargar los clientes'
        );
        this.router.navigate(['/ver-ventas']);
      },
    });
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al cargar los productos'
        );
        this.router.navigate(['/ver-ventas']);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const venta = {
        ...this.form.value,
        fecha_venta: formatDate(
          this.form.value.fecha_venta,
          'yyyy-MM-dd',
          'en'
        ),
        listaProductos: this.form.value.listaProductos.map((id: number) => ({
          codigo_producto: id,
        })),
        unCliente: { id_cliente: this.form.value.unCliente },
      } as VentaCreate;

      if (
        !venta.unCliente.toString().trim() ||
        !venta.fecha_venta.trim() ||
        !venta.listaProductos.length
      ) {
        this.message.showWarning('Los campos no pueden estar vacíos');
        return;
      }

      venta.listaProductos.forEach((producto) => {
        if (isNaN(producto.codigo_producto) || producto.codigo_producto < 1) {
          this.message.showWarning('Los productos deben ser números válidos.');
          return;
        }
      });

      if (isNaN(venta.unCliente.id_cliente)) {
        this.message.showWarning('El cliente debe ser un número válido.');
        return;
      }

      if (venta.unCliente.id_cliente < 1) {
        this.message.showWarning('El cliente debe ser un número mayor a cero.');
        return;
      }

      this.dialogRef.close(venta);
    } else {
      this.message.showWarning(
        'Por favor, complete el formulario correctanmente.'
      );
      return;
    }
  }
}
