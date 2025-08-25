import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginUpdate } from '../../models/login.model';
import { MessageService } from '../../../../core/services/message.service';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { CommonModule, formatDate } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-editar-atributos-usuario',
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
  templateUrl: './editar-atributos-usuario.component.html',
  styleUrl: './editar-atributos-usuario.component.scss',
})
export class EditarAtributosUsuarioComponent implements OnInit {
  form: FormGroup;
  roles: Rol[] | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarAtributosUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string; attribute: keyof LoginUpdate; value: string },
    private message: MessageService,
    private rolService: RolService
  ) {
    this.form = this.formBuilder.group({
      value: [data?.value || '', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.data.attribute) {
      this.dialogRef.close();
    }

    this.getRoles();
  }

  getRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (listaRoles) => {
        this.roles = listaRoles;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al cargar la lista de roles'
        );
        this.dialogRef.close();
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    let newValue = this.form.get('value')?.value;

    if (this.form.valid) {
      if (newValue instanceof Date) {
        newValue = formatDate(newValue, 'yyyy-MM-dd', 'en');
      }

      if (!String(newValue).trim()) {
        this.message.showWarning('El valor del campo no puede estar vacio');
        return;
      }

      if (typeof newValue === 'string' && !newValue.trim()) {
        this.message.showWarning('El valor del campo no puede estar vacio');
        return;
      }

      this.dialogRef.close({
        attribute: this.data.attribute,
        value: newValue,
      });
    }
  }
}
