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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
      direccion: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
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

  save(): void {}
}
