import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Producto } from '../../models/producto.model';
import { MessageService } from '../../../../core/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminacionProductoComponent } from '../../components/confirmar-eliminacion-producto/confirmar-eliminacion-producto.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-ver-productos-faltantes',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './ver-productos-faltantes.component.html',
  styleUrl: './ver-productos-faltantes.component.scss',
})
export class VerProductosFaltantesComponent implements OnInit {
  private productos: Producto[] = [];
  searchResults: Producto[] = [];
  searchText: string = '';
  pageSize = 10;
  currentPage = 1;
  constructor(
    private productoService: ProductoService,
    private message: MessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.missingProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.searchResults = productos;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener los productos faltantes. '
        );
      },
    });
  }

  get filteredProductos(): void {
    if (!this.searchText.trim()) {
      this.searchResults = this.productos;
      return;
    }

    this.searchResults = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.currentPage = 1;
  }

  get paginatedProductos(): Producto[] {
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

  optionsProducto(codigo_producto: number) {
    this.router.navigate(['/opciones-producto', codigo_producto]);
  }

  openModalConfirmation(codigo_producto: number, nombre: String) {
    const dialogRef = this.dialog.open(ConfirmarEliminacionProductoComponent, {
      width: '500px',
      data: { nombre: nombre },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          if (codigo_producto) {
            this.productoService.deleteProducto(codigo_producto).subscribe({
              next: (response) => {
                this.message.showWarning(response.message);
                this.getProductos();
              },
              error: (error) => {
                this.message.showWarning(
                  error.error?.message || 'Error al eliminar el producto'
                );
              },
            });
          }
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al abrir la ventana de confirmación'
        );
      },
    });
  }
}
