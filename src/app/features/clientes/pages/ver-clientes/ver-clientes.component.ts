import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from '../../../../core/services/message.service';
import { CrearClienteComponent } from '../../components/crear-cliente/crear-cliente.component';
import { Cliente } from '../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { ConfirmarEliminacionClienteComponent } from '../../components/confirmar-eliminacion-cliente/confirmar-eliminacion-cliente.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-clientes',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.scss',
})
export class VerClientesComponent implements OnInit {
  private clientes: Cliente[] = [];
  searchResults: Cliente[] = [];
  searchText: string = '';
  pageSize = 10;
  currentPage = 1;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private mesage: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  get filteredClientes(): void {
    if (!this.searchText.trim()) {
      this.getClientes();
      return;
    }

    this.searchResults = this.clientes.filter((cliente) =>
      cliente.cedula.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.currentPage = 1;
  }

  get paginatedClientes(): Cliente[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.searchResults.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.searchResults.length / this.pageSize);
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

  optionsCliente(id_cliente: number): void {
    this.router.navigate(['/opciones-clientes', id_cliente]);
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.searchResults = clientes.reverse();
      },
      error: (error) => {
        this.mesage.showWarning(
          error.error?.message || 'Error al cargar los clientes'
        );
      },
    });
  }

  openFormCreateCliente(): void {
    const dialogRef = this.dialog.open(CrearClienteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe({
      next: (cliente) => {
        if (cliente) {
          this.clienteService.createCliente(cliente).subscribe({
            next: (response) => {
              this.mesage.showWarning(response.message);
              this.getClientes();
            },
            error: (error) => {
              this.mesage.showWarning(
                error.error?.message || 'Error al crear el cliente'
              );
            },
          });
        }
      },
      error: (error) => {
        this.mesage.showWarning(
          error.error?.message || 'Error al abrir el formulario'
        );
      },
    });
  }

  openModalConfirmation(id_cliente: number, nombre: string): void {
    const dialogRef = this.dialog.open(ConfirmarEliminacionClienteComponent, {
      width: '500px',
      data: { nombre },
    });

    dialogRef.afterClosed().subscribe({
      next: (confirm) => {
        if (confirm) {
          this.clienteService.deleteCliente(id_cliente).subscribe({
            next: (response) => {
              this.mesage.showWarning(response.message);
              this.getClientes();
            },
            error: (error) => {
              this.mesage.showWarning(
                error.error?.message || 'Error al eliminar el cliente'
              );
            },
          });
        }
      },
      error: (error) => {
        this.mesage.showWarning(
          error.error?.message || 'Error al abrir la ventana de confirmación'
        );
      },
    });
  }
}
