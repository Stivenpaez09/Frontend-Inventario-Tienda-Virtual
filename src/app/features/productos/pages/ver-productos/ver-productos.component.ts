import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { MessageService } from '../../../../core/services/message.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ProductoService } from '../../services/producto.service';
import { CrearProductoComponent } from '../../components/crear-producto/crear-producto.component';
import { ConfirmarEliminacionProductoComponent } from '../../components/confirmar-eliminacion-producto/confirmar-eliminacion-producto.component';

@Component({
  selector: 'app-ver-productos',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss',
})
export class VerProductosComponent implements OnInit {
  private productos: Producto[] = [];
  searchText: string = '';
  searchTextActivo: string = '';
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
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener los productos '
        );
      },
    });
  }

  get filteredProductos(): Producto[] {
    if (!this.searchText.trim()) {
      return this.productos;
    }

    return this.productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(this.searchTextActivo.toLowerCase())
    );
  }

  get paginatedProductos(): Producto[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProductos.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProductos.length / this.pageSize);
  }

  buscarProductos(): void {
    this.searchTextActivo = this.searchText;
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

  optionsProducto(codigo_producto: number): void {
    this.router.navigate(['/opciones-producto', codigo_producto]);
  }

  openFormCreateProducto(): void {
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe({
      next: (producto) => {
        if (producto) {
          this.productoService.createProducto(producto).subscribe({
            next: (response) => {
              this.message.showWarning(response.message);
              this.getProductos();
            },
            error: (error) => {
              this.message.showWarning(
                error.error?.message || 'Error al crear el producto'
              );
            },
          });
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al cargar la informacion de la ventana'
        );
      },
    });
  }

  openModalConfirmation(codigo_producto: number, nombre: string): void {
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
