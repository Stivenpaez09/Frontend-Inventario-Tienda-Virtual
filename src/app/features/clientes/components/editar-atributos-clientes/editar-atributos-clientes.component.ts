import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../../models/cliente.model';
import { MessageService } from '../../../../core/services/message.service';

@Component({
  selector: 'app-editar-atributos-clientes',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './editar-atributos-clientes.component.html',
  styleUrl: './editar-atributos-clientes.component.scss',
})
export class EditarAtributosClientesComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditarAtributosClientesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { attribute: keyof Cliente; value: string },
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

    if (this.form.valid) {
      this.dialogRef.close({
        attribute: this.data.attribute,
        value: newValue,
      });
    }
  }
}
