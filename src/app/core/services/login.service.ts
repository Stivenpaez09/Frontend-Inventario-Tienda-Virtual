import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { interval } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  JwtPayload,
  AuthenticatedLogin,
  LoginRol,
  AuthError,
  LoginProfile,
} from '../models/auth.interfaces';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_BASE_URL = environment.apiUrl;
  private readonly AUTH_ENDPOINT = environment.endpoints.auth;
  private readonly LOGIN_URL = `${this.API_BASE_URL.replace(
    /\/$/,
    ''
  )}${this.AUTH_ENDPOINT.replace(/\/$/, '')}/login`;
  private readonly TOKEN_KEY = 'auth_token';
  private tokenCheckSub?: Subscription;

  // BehaviorSubject para manejar el estado de autenticación
  private currentLoginSubject = new BehaviorSubject<JwtPayload | null>(null);
  public currentLogin = this.currentLoginSubject.asObservable();

  // Inyectamos HttpClient para realizar peticiones HTTP
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    // Al inicializar el servicio, verificar si hay un token guardado
    this.checkStoredToken();
    this.startTokenExpirationCheck();

    if (!environment.production) {
      console.log('LoginService initialized');
      console.log('Login URL: ', this.LOGIN_URL);
    }
  }

  //Realiza el login enviando las credenciales al backend
  login(credentials: LoginRequest): Observable<LoginResponse> {
    if (!environment.production) {
      console.log('Enviando la peticion a:', this.LOGIN_URL);
      console.log('Credenciales: ', { username: credentials.username });
    }

    return this.http.post<LoginResponse>(this.LOGIN_URL, credentials).pipe(
      tap((response) => {
        if (!environment.production) {
          console.log('Respuesta recibida con exito');
        }

        // Guardar el token y decodificarlo
        this.storeToken(response.token);
        const decodedToken = this.decodeToken(response.token);
        this.currentLoginSubject.next(decodedToken);

        if (!environment.production && decodedToken) {
          console.log('Token decodificado:', {
            roles: decodedToken.roles,
            sub: decodedToken.sub,
            exp: new Date(decodedToken.exp * 1000),
          });
        }
      })
    );
  }

  //Guarda el token en localStorage
  private storeToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.TOKEN_KEY, token);

      if (!environment.production) {
        console.log('Token guardado en localStorage');
      }
    }
  }

  //Obtiene el token guardado
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }

    return null;
  }

  //Decodifica el JWT token
  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);

      //Validar que el payload tenga la estructura esperada
      if (
        !parsedPayload.sub ||
        !parsedPayload.roles ||
        !parsedPayload.iat ||
        !parsedPayload.exp
      ) {
        console.error('Token JWT no tiene la estructura esperada');
        return null;
      }

      return parsedPayload as JwtPayload;
    } catch (error) {
      console.log('Error al decodificar el token:', error);
      return null;
    }
  }

  //Verifica si hay un token guardado al iniciar el servicio
  private checkStoredToken(): void {
    const token = this.getToken();

    if (token) {
      if (!this.isTokenExpired(token)) {
        // Token válido
        const decodedToken = this.decodeToken(token);
        this.currentLoginSubject.next(decodedToken);

        if (this.isAdministrador()) {
          console.log('Redirigiendo al Dashboard de Administrador');
          this.router.navigate(['/dashboard-admin']);
        } else if (this.isAsistente()) {
          console.log('Redirigiendo al Dashboard de Asistente');
          this.router.navigate(['/dashboard-asistente']);
        }

        if (!environment.production) {
          console.log('Token encontrado y decodificado al iniciar el servicio');
        }
      } else {
        // Token expirado
        this.logout();

        if (!environment.production) {
          console.log('Token expirado, se ha cerrado la sesión');
        }
      }
    }
  }

  //Revisa cada minuto si el token ha expirado
  //Si ha expirado, cierra la sesión y muestra un mensaje de advertencia
  private startTokenExpirationCheck(): void {
    this.tokenCheckSub?.unsubscribe();

    this.tokenCheckSub = interval(60000).subscribe(() => {
      const token = this.getToken();

      if (token && this.isTokenExpired(token)) {
        this.logout();

        this.messageService.showWarning(
          'Tu sesión ha expirado, por favor vuelve a iniciar sesión.'
        );
      }
    });
  }

  //Verifica si el token ha expirado
  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);

    if (!decodedToken) {
      return true; // Si no se puede decodificar, consideramos que ha expirado
    }

    const currentTime = Date.now() / 1000; // Convertir a segundos
    const isExpired = decodedToken.exp < currentTime;

    if (!environment.production && isExpired) {
      console.log(
        'El token ha expirado,',
        new Date(decodedToken.exp * 1000),
        'ahora: ',
        new Date()
      );
    }

    return isExpired;
  }

  //Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.isTokenExpired(token);
  }

  //Obtiene los roles del usuario actual
  getLoginRoles(): string[] {
    const currentLogin = this.currentLoginSubject.value;
    return currentLogin ? currentLogin.roles : [];
  }

  //Obtiene el username del usuario actual
  getLoginUsername(): string | null {
    const currentLogin = this.currentLoginSubject.value;
    return currentLogin ? currentLogin.sub : null;
  }

  //Verifica si el usuario tiene un rol específico
  hasRole(role: LoginRol): boolean {
    return this.getLoginRoles().includes(role);
  }

  //Verifica si el usuario es administrador
  isAdministrador(): boolean {
    return this.hasRole(LoginRol.ADMINISTRADOR);
  }

  //Verifica si el usuario es asistente
  isAsistente(): boolean {
    return this.hasRole(LoginRol.ASISTENTE);
  }

  //Obtiene el estado completo del usuario autenticado
  getAuthenticatedLogin(): AuthenticatedLogin | null {
    const currentLogin = this.currentLoginSubject.value;
    if (!currentLogin) return null;

    return {
      username: currentLogin.sub,
      roles: currentLogin.roles,
      isAuthenticated: true,
    };
  }

  //Obtiene la información del usuario para mostrar en la UI
  getCurrentLoginInfo(): {
    username: string;
    roles: string[];
    isAdministrador: boolean;
    isAsistente: boolean;
  } | null {
    const authenticatedLogin = this.getAuthenticatedLogin();
    if (!authenticatedLogin) return null;

    return {
      username: authenticatedLogin.username,
      roles: authenticatedLogin.roles,
      isAdministrador: this.isAdministrador(),
      isAsistente: this.isAsistente(),
    };
  }

  //Obtiene el perfil del usuario autenticado
  getLoginProfile(): Observable<LoginProfile> {
    const username = this.getLoginUsername();

    if (!username) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const url = `${this.API_BASE_URL.replace(
      /\/$/,
      ''
    )}${environment.endpoints.logins.replace(/\/$/, '')}/${username}/profile`;

    return this.http.get<LoginProfile>(url);
  }

  //Cierra la sesión del usuario
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.currentLoginSubject.next(null);
    this.tokenCheckSub?.unsubscribe();
    this.tokenCheckSub = undefined;

    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }

    if (!environment.production) {
      console.log('Sesión cerrada y token eliminado de localStorage');
    }

    console.trace('logout ejecutado');
  }
}
