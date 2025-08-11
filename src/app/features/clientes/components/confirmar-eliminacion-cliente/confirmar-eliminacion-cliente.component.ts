import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion-cliente',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion-cliente.component.html',
  styleUrl: './confirmar-eliminacion-cliente.component.scss',
})
export class ConfirmarEliminacionClienteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
