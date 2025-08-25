import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../../core/services/message.service';
import { CommonModule, formatDate } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-crear-usuario',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss',
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup;
  roles: Rol[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>,
    private message: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      unRol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener los roles'
        );
        this.dialogRef.close();
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const usuario = {
        ...this.form.value,
        fecha_nacimiento: formatDate(
          this.form.value.fecha_nacimiento,
          'yyyy-MM-dd',
          'en'
        ),
      } as Login;

      if (
        !usuario.nombre.trim() ||
        !usuario.apellido.trim() ||
        !usuario.telefono.trim() ||
        !usuario.cedula.trim() ||
        !usuario.direccion.trim() ||
        !usuario.username.trim() ||
        !usuario.password.trim()
      ) {
        this.message.showWarning('Los campos no pueden estar vacios.');
        return;
      }

      if (isNaN(usuario.unRol)) {
        this.message.showWarning('Debe seleccionar un rol.');
        return;
      }

      this.dialogRef.close(usuario);
    } else {
      this.message.showWarning(
        'Por favor, complete el formulario correctanmente.'
      );
      return;
    }
  }
}
