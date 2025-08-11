import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { LoginService } from '../../services/login.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(LoginService);
  return next(req).pipe(
    catchError((error) => {
      // Errores 4xx (Client)
      if (error.status === 400) {
        // Bad Request - Datos incorrectos en la solicitud
        messageService.showWarning('Datos de solicitud incorrectos');
      }

      if (error.status === 401) {
        // Unauthorized - No autenticado
        authService.logout();
        router.navigate(['/login']);
        messageService.showWarning(
          'Usuario no autenticado, por favor inicie sesión'
        );
      }

      if (error.status === 403) {
        // Forbidden - Autenticado pero sin permisos
        authService.logout();
        router.navigate(['/login']);
        messageService.showWarning('No tiene permisos para esta acción');
      }

      if (error.status === 404) {
        // Not Found - Recurso no existe
        messageService.showWarning('Recurso no encontrado');
      }

      if (error.status === 405) {
        // Method Not Allowed
        messageService.showWarning('Método HTTP no permitido');
      }

      if (error.status === 408) {
        // Request Timeout
        messageService.showWarning('Tiempo de espera agotado');
      }

      if (error.status === 429) {
        // Too Many Requests
        messageService.showWarning('Demasiadas solicitudes, por favor espere');
      }

      // Errores 5xx (Server)
      if (error.status === 500) {
        // Internal Server Error
        messageService.showWarning('Error interno del servidor');
      }

      if (error.status === 502) {
        // Bad Gateway
        messageService.showWarning('Error de comunicación entre servidores');
      }

      if (error.status === 503) {
        // Service Unavailable
        messageService.showWarning('Servicio no disponible temporalmente');
      }

      if (error.status === 504) {
        // Gateway Timeout
        messageService.showWarning('Tiempo de espera agotado en el servidor');
      }

      // Manejo genérico para otros errores
      if (!error.status) {
        // Error de red (sin conexión, CORS, etc.)
        messageService.showWarning('Error de conexión con el servidor');
      }

      return throwError(() => error);
    })
  );
};
