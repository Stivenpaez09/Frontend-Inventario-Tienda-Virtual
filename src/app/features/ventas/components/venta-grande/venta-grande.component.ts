import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VentaService } from '../../services/venta.service';
import { MessageService } from '../../../../core/services/message.service';
import { BiggestVenta } from '../../models/venta.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-venta-grande',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './venta-grande.component.html',
  styleUrl: './venta-grande.component.scss',
})
export class VentaGrandeComponent implements OnInit {
  venta: BiggestVenta | null = null;
  constructor(
    private ventaService: VentaService,
    private dialog: MatDialogRef<VentaGrandeComponent>,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.getVenta();
  }

  getVenta(): void {
    this.ventaService.findBiggestVenta().subscribe({
      next: (venta) => {
        this.venta = venta;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener la venta más grande'
        );
        this.dialog.close();
      },
    });
  }

  close(): void {
    this.dialog.close();
  }
}
