import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Cliente } from '../../models/cliente.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from '../../../../core/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { EditarAtributosClientesComponent } from '../../components/editar-atributos-clientes/editar-atributos-clientes.component';

@Component({
  selector: 'app-opciones-clientes',
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './opciones-clientes.component.html',
  styleUrl: './opciones-clientes.component.scss',
})
export class OpcionesClientesComponent implements OnInit {
  id_cliente: number | null = null;
  cliente?: Cliente;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: MessageService,
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id_cliente = Number(
      this.activatedRoute.snapshot.paramMap.get('id_cliente')
    );

    if (!this.id_cliente || isNaN(this.id_cliente)) {
      this.message.showWarning('El ID del cliente no es válido.');
      this.router.navigate(['/ver-clientes']);
      return;
    }

    this.findCliente();
  }

  findCliente(): void {
    this.clienteService.findCliente(this.id_cliente!).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.cliente = cliente;
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al buscar el cliente.'
        );
        this.router.navigate(['/ver-clientes']);
        return;
      },
    });
  }

  openFormEdit(attribute: keyof Cliente, value: string): void {
    if (!attribute || !value) {
      this.message.showWarning('Datos invalidos, intente mas tarde');
      return;
    }

    const dialogRef = this.dialog.open(EditarAtributosClientesComponent, {
      width: '500px',
      data: {
        attribute: attribute,
        value: value,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          if (result.attribute === 'nombre') {
            this.clienteService
              .updateNombreCliente(this.id_cliente!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.cliente) {
                    (this.cliente as any)[result.attribute] = result.value;
                    this.message.showWarning(response.mesagge);
                  }
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el nombre del cliente.'
                  );
                },
              });
          }

          if (result.attribute === 'apellido') {
            this.clienteService
              .updateApellidoCliente(this.id_cliente!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.cliente) {
                    (this.cliente as any)[result.attribute] = result.value;
                    this.message.showWarning(response.message);
                  }
                },
                error: (error) => {
                  console.log(error);
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el apellido del cliente.'
                  );
                },
              });
          }

          if (result.attribute === 'cedula') {
            this.clienteService
              .updateCedulaCliente(this.id_cliente!, result.value)
              .subscribe({
                next: (response) => {
                  if (this.cliente) {
                    (this.cliente as any)[result.attribute] = result.value;
                    this.message.showWarning(response.message);
                  }
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar la cedula del cliente.'
                  );
                },
              });
          }
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al actualizar el producto.'
        );
      },
    });
  }
}
