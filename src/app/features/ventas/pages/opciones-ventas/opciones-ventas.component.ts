import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { VentaService } from '../../services/venta.service';
import { MessageService } from '../../../../core/services/message.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Venta } from '../../models/venta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opciones-ventas',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './opciones-ventas.component.html',
  styleUrl: './opciones-ventas.component.scss',
})
export class OpcionesVentasComponent implements OnInit {
  codigo_venta: number | null = null;
  venta: Venta | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ventaService: VentaService,
    private message: MessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.codigo_venta = Number(
      this.activatedRoute.snapshot.paramMap.get('codigo_venta')
    );

    if (!this.codigo_venta || isNaN(this.codigo_venta)) {
      this.message.showWarning('Código de venta inválido');
      this.router.navigate(['/ver-ventas']);
      return;
    }

    this.findVenta();
  }

  findVenta(): void {
    this.ventaService.findVenta(this.codigo_venta!).subscribe({
      next: (venta) => {
        this.venta = venta;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener la venta'
        );
        this.router.navigate(['/ver-ventas']);
      },
    });
  }
}
