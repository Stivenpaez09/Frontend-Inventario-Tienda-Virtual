import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },

  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layouts/layouts.component').then(
        (m) => m.LayoutsComponent
      ),
    children: [
      {
        path: 'dashboard-admin',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Inicio',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR'] },
      },
      {
        path: 'dashboard-asistente',
        loadComponent: () =>
          import(
            './features/asistente/pages/dashboard/dashboard.component'
          ).then((m) => m.DashboardComponent),
        title: 'Inicio',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ASISTENTE'] },
      },

      {
        path: 'ver-productos',
        loadComponent: () =>
          import(
            './features/productos/pages/ver-productos/ver-productos.component'
          ).then((m) => m.VerProductosComponent),
        title: 'Productos',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },

      {
        path: 'opciones-producto/:codigo_producto',
        loadComponent: () =>
          import(
            './features/productos/pages/opciones-productos/opciones-productos.component'
          ).then((m) => m.OpcionesProductosComponent),
        title: 'Productos',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'ver-productos-faltantes',
        loadComponent: () =>
          import(
            './features/productos/pages/ver-productos-faltantes/ver-productos-faltantes.component'
          ).then((m) => m.VerProductosFaltantesComponent),
        title: 'Productos Faltantes',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'ver-clientes',
        loadComponent: () =>
          import(
            './features/clientes/pages/ver-clientes/ver-clientes.component'
          ).then((m) => m.VerClientesComponent),
        title: 'Clientes',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'opciones-clientes/:id_cliente',
        loadComponent: () =>
          import(
            './features/clientes/pages/opciones-clientes/opciones-clientes.component'
          ).then((m) => m.OpcionesClientesComponent),
        title: 'Clientes',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'ver-ventas',
        loadComponent: () =>
          import(
            './features/ventas/pages/ver-ventas/ver-ventas.component'
          ).then((m) => m.VerVentasComponent),
        title: 'Ventas',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'opciones-ventas/:codigo_venta',
        loadComponent: () =>
          import(
            './features/ventas/pages/opciones-ventas/opciones-ventas.component'
          ).then((m) => m.OpcionesVentasComponent),
        title: 'Ventas',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_ASISTENTE'] },
      },
      {
        path: 'ver-usuarios',
        loadComponent: () =>
          import(
            './features/usuarios/pages/ver-usuarios/ver-usuarios.component'
          ).then((m) => m.VerUsuariosComponent),
        title: 'Usuarios',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR'] },
      },
      {
        path: 'opciones-usuarios/:id',
        loadComponent: () =>
          import(
            './features/usuarios/pages/opciones-usuarios/opciones-usuarios.component'
          ).then((m) => m.OpcionesUsuariosComponent),
        title: 'Usuarios',
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMINISTRADOR'] },
      },
    ],
  },
];
