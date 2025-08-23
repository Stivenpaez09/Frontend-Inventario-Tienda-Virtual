import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowLogin } from '../../models/login.model';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../../../core/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminacionUsuarioComponent } from '../../components/confirmar-eliminacion-usuario/confirmar-eliminacion-usuario.component';

@Component({
  selector: 'app-ver-usuarios',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.scss',
})
export class VerUsuariosComponent implements OnInit {
  usuarios: ShowLogin[] = [];
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    private usuarioService: UsuarioService,
    private message: MessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getLogins().subscribe({
      next: (logins) => {
        this.usuarios = logins;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener los usuarios'
        );
      },
    });
  }

  get filteredUsuarios(): ShowLogin[] {
    if (!this.searchText.trim()) {
      return this.usuarios;
    }

    return this.usuarios.filter((usuario) =>
      usuario.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedUsuarios(): ShowLogin[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsuarios.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsuarios.length / this.pageSize);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  optionsUsuario(id: number): void {
    this.router.navigate(['/opciones-usuarios', id]);
  }

  openModalConfirmation(id: number, username: string, rol: string): void {
    const dialogRef = this.dialog.open(ConfirmarEliminacionUsuarioComponent, {
      width: '500px',
      data: { username, rol },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.usuarioService.deleteLogin(id).subscribe({
            next: (response) => {
              this.message.showWarning(
                response.message || 'Usuario eliminado correctamente'
              );
              this.getUsuarios();
            },
          });
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al eliminar el producto'
        );
      },
    });
  }

  openFormCreateLogin(): void {}
}
