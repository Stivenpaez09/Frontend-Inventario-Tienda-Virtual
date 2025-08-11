import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-eliminacion-producto',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion-producto.component.html',
  styleUrl: './confirmar-eliminacion-producto.component.scss',
})
export class ConfirmarEliminacionProductoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string }
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
