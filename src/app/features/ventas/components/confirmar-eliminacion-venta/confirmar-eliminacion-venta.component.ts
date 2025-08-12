import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-eliminacion-venta',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion-venta.component.html',
  styleUrl: './confirmar-eliminacion-venta.component.scss'
})
export class ConfirmarEliminacionVentaComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codigo_venta: number, nombreCliente: string }
  ){}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
