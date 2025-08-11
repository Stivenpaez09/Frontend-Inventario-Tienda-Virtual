import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginProfile } from '../../../core/models/auth.interfaces';
import { LoginService } from '../../../core/services/login.service';
import { MessageService } from '../../../core/services/message.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  perfilUsuario?: LoginProfile;
  private subscriptions: Subscription[] = []; // Arreglo para manejar las suscripciones

  constructor(
    private loginService: LoginService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    //suscripcion al estado de autenticación del usuario

    this.subscriptions.push(
      this.loginService.currentLogin.subscribe({
        next: (login) => {
          if (login && this.loginService.isAuthenticated()) {
            this.obtenerPerfilUsuario();
          } else {
            this.perfilUsuario = undefined;
          }
        },
      })
    );
  }

  obtenerPerfilUsuario(): void {
    // doble validación por si acaso
    if (!this.loginService.isAuthenticated()) {
      if (!environment.production) {
        console.log('No autenticado, no se puede obtener el perfil');
      }
      return this.message.showWarning(
        'No autenticado, no se puede obtener el perfil'
      );
    }

    //Me suscribo al perfil del usuario
    this.loginService.getLoginProfile().subscribe({
      next: (profile: LoginProfile) => {
        //si profile es correcto, lo asigno a la variable perfilUsuario
        this.perfilUsuario = profile;
        if (!environment.production) {
          console.log('Perfil de usuario obtenido');
        }
      },
      error: (error) => {
        //si hay un error, lo manejo y muestro el mensaje que envia el backend
        const errorMessage =
          error.error?.message || 'Error al obtener la informacion del usuario';
        if (!environment.production) {
          console.log('Error al obtener el perfil de usuario:', error);
        }

        this.message.showWarning(errorMessage);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
