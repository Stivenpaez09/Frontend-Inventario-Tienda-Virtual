import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../../../../core/services/message.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-crear-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CrearProductoComponent>,
    private message: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(1)]],
      cantidad_disponible: [0, [Validators.required, Validators.min(1)]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const producto = this.form.value as Producto;

      if (
        !producto.nombre.trim() ||
        !producto.marca.trim() ||
        !producto.costo.toString().trim() ||
        !producto.cantidad_disponible.toString().trim()
      ) {
        this.message.showWarning('Los campos no pueden estar vacío');
        return;
      }

      if (isNaN(producto.costo) || isNaN(producto.cantidad_disponible)) {
        this.message.showWarning('El costo y la cantidad deben ser números.');
        return;
      } else {
        if (producto.costo <= 0 || producto.cantidad_disponible <= 0) {
          this.message.showWarning(
            'El costo y la cantidad disponible deben ser mayores a cero.'
          );
          return;
        }
      }

      this.dialogRef.close(producto);
    } else {
      this.message.showWarning(
        'Por favor, complete el formulario correctanmente.'
      );
      return;
    }
  }
}
