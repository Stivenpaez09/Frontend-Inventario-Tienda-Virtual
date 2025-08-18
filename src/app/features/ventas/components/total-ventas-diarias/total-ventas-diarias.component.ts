import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from '../../../../core/services/message.service';
import { VentaService } from '../../services/venta.service';
import { CommonModule, formatDate } from '@angular/common';
import { TotalVentasDiarias } from '../../models/venta.model';
@Component({
  selector: 'app-total-ventas-diarias',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './total-ventas-diarias.component.html',
  styleUrl: './total-ventas-diarias.component.scss',
})
export class TotalVentasDiariasComponent {
  formFecha: FormGroup;
  venta: TotalVentasDiarias | null = null;

  constructor(
    private message: MessageService,
    private dialog: MatDialogRef<TotalVentasDiariasComponent>,
    private ventaService: VentaService,
    private formBuilder: FormBuilder
  ) {
    this.formFecha = this.formBuilder.group({
      fecha: ['', Validators.required],
    });
  }

  close(): void {
    this.dialog.close();
  }

  find(): void {
    if (this.formFecha.valid) {
      const fecha = formatDate(
        this.formFecha.value.fecha,
        'yyyy-MM-dd',
        'en-US'
      );

      this.ventaService.findVentasByDate(fecha).subscribe({
        next: (venta) => {
          this.venta = venta;
        },
        error: (error) => {
          this.message.showWarning(
            error.error?.message ||
              `Error al obtener la venta del dia ${{ fecha }}`
          );
        },
      });
    }
  }
}
