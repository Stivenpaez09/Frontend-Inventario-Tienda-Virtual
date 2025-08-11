import { Component } from '@angular/core';
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
import { MessageService } from '../../../../core/services/message.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-crear-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss',
})
export class CrearClienteComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CrearClienteComponent>,
    private message: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const cliente = this.form.value as Cliente;

      if (
        !cliente.nombre.trim() ||
        !cliente.apellido.trim() ||
        !cliente.cedula.trim()
      ) {
        this.message.showWarning('Los campos no pueden estar vacios.');
        return;
      }

      this.dialogRef.close(cliente);
    } else {
      this.message.showWarning(
        'Por favor, complete todos los campos correctamente.'
      );
    }
  }
}
