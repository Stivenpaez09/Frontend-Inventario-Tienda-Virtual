import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion-usuario',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminacion-usuario.component.html',
  styleUrl: './confirmar-eliminacion-usuario.component.scss',
})
export class ConfirmarEliminacionUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { username: string; rol: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
