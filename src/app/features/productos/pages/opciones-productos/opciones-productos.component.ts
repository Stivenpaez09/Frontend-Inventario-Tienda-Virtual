import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MessageService } from '../../../../core/services/message.service';
import { Producto } from '../../models/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto.service';
import { EditarNombreComponent } from '../../components/editar-atributos/editar-atributos.component';

@Component({
  selector: 'app-opciones-productos',
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './opciones-productos.component.html',
  styleUrl: './opciones-productos.component.scss',
})
export class OpcionesProductosComponent implements OnInit {
  private codigo_producto: number | null = null;
  producto?: Producto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: MessageService,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.codigo_producto = Number(
      this.activatedRoute.snapshot.paramMap.get('codigo_producto')
    );

    // Validar que el codigo_producto sea un numero valido
    if (!this.codigo_producto || isNaN(this.codigo_producto)) {
      this.router.navigate(['/ver-productos']);
      this.message.showWarning('ID invalido');
      return;
    }
    this.findProducto();
  }

  // Método para buscar el producto por su código
  findProducto() {
    this.productoService.findProducto(this.codigo_producto!).subscribe({
      next: (producto) => {
        this.producto = producto;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener el producto. '
        );
        this.router.navigate(['/ver-productos']);
        return;
      },
    });
  }

  // Método para abrir el formulario de edición de atributos
  openFormEdit(label: string, attribute: keyof Producto, value: string): void {
    if (!label || !attribute || !value) {
      this.message.showWarning('Datos invalidos, intente mas tarde');
      return;
    }

    const dialogRef = this.dialog.open(EditarNombreComponent, {
      width: '500px',
      data: {
        label: label,
        attribute: attribute,
        value: value,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          if (result.attribute === 'nombre') {
            this.productoService
              .updateNombreProducto(this.codigo_producto!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.producto) {
                    (this.producto as any)[result.attribute] = result.value;
                  }

                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el nombre del producto'
                  );
                },
              });
          }

          if (result.attribute === 'marca') {
            this.productoService
              .updateMarcaProducto(this.codigo_producto!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.producto) {
                    (this.producto as any)[result.attribute] = result.value;
                  }

                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar la marca del producto'
                  );
                },
              });
          }

          if (result.attribute === 'costo') {
            this.productoService
              .updateCostoProducto(this.codigo_producto!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.producto) {
                    (this.producto as any)[result.attribute] = result.value;
                  }

                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el valor del producto'
                  );
                },
              });
          }

          if (result.attribute === 'cantidad_disponible') {
            this.productoService
              .updateCantidadDisponibleProducto(
                this.codigo_producto!,
                result.value
              )
              .subscribe({
                next: (response) => {
                  if (this.producto) {
                    (this.producto as any)[result.attribute] = result.value;
                  }

                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar la cantidad disponible del producto'
                  );
                },
              });
          }
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al actualizar el producto. '
        );
      },
    });
  }
}
