import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ShowVentas, Venta } from '../../models/venta.model';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { MessageService } from '../../../../core/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearVentaComponent } from '../../components/crear-venta/crear-venta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-ventas',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './ver-ventas.component.html',
  styleUrl: './ver-ventas.component.scss',
})
export class VerVentasComponent implements OnInit {
  private ventas: ShowVentas[] = [];
  searchResults: ShowVentas[] = [];
  searchText: string = '';
  pageSize = 10;
  currentPage = 1;

  constructor(
    private ventaService: VentaService,
    private dialog: MatDialog,
    private message: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getVentas();
  }

  getVentas(): void {
    this.ventaService.getShowVentas().subscribe({
      next: (ventas) => {
        this.ventas = ventas;
        this.searchResults = ventas.reverse();
      },
      error: (error) => {
        console.log(error);
        this.message.showWarning(
          error.error?.message || 'Error al obtener la lista de ventas'
        );
      },
    });
  }

  get filteredVentas(): void {
    if (!this.searchText.trim()) {
      this.getVentas();
      return;
    }

    this.searchResults = this.ventas.filter((venta) =>
      venta.cedulaCliente.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.currentPage = 1;
  }

  get paginatedVentas(): ShowVentas[] {
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

  openFormCreateVenta(): void {
    const dialogRef = this.dialog.open(CrearVentaComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe({
      next: (venta) => {
        if (venta) {
          console.log('Venta creada:', venta);
          this.ventaService.createVenta(venta).subscribe({
            next: (response) => {
              this.message.showWarning(response.message);
              this.getVentas();
            },
            error: (error) => {
              this.message.showWarning(
                error.error?.message || 'Error al crear la venta'
              );
            },
          });
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'No se pudon abrir el formulario de venta'
        );
      },
    });
  }

  optionsVenta(codigo_venta: number): void {
    this.router.navigate(['/opciones-ventas', codigo_venta]);
  }

  openModalConfirmation(codigo_venta: number, nombre: string): void {}
}
