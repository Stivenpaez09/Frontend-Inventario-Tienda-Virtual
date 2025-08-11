import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../../../../core/services/message.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-editar-nombre',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './editar-atributos.component.html',
  styleUrl: './editar-atributos.component.scss',
})
export class EditarNombreComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarNombreComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string; attribute: keyof Producto; value: string },
    private message: MessageService
  ) {
    this.form = this.formBuilder.group({
      value: [data?.value || '', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    let newValue = this.form.get('value')?.value;

    if (!newValue.trim()) {
      this.message.showWarning('El campo no puede estar vacío');
      return;
    }

    if (['cantidad_disponible', 'costo'].includes(this.data.attribute)) {
      newValue = Number(newValue);

      if (isNaN(newValue)) {
        this.message.showWarning('El valor debe ser un número');
        return;
      }

      if (newValue <= 0) {
        this.message.showWarning('El valor no puede ser negativo');
        return;
      }
    }
    if (this.form.valid) {
      this.dialogRef.close({
        attribute: this.data.attribute,
        value: newValue,
      });
    }
  }
}
