import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginRol } from '../models/auth.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, //me da la informacion la ruta que se va a activar
    state: RouterStateSnapshot //me da la ruta completa como un string
  ): boolean {
    //si no esta autenticado me enviara al Login
    if (!this.loginService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    //verifica los roles que necesita la ruta
    const expectedRoles: LoginRol[] = route.data['roles'];

    //verifica si el usuario tiene alguno de los roles necesarios
    if (expectedRoles && expectedRoles.length > 0) {
      const hasRole = expectedRoles.some(
        (role) => this.loginService.hasRole(role) //verifica si el login tiene el rol
      );
      if (!hasRole) {
        // Si no tiene el rol, puedes redirigir a una página de acceso denegado o dashboard
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}
