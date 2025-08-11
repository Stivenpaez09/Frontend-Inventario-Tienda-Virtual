import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../core/services/login.service';
import {
  LoginRequest,
  LoginRol,
} from '../../../../core/models/auth.interfaces';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //Se declara la variable del formulario de inicio de sesión y se inicializa con el FormBuilder
  loginForm: FormGroup;
  //Se declara la variable para almacenar el error de inicio de sesión
  loginError: string = '';

  //Se declara la variable para manejar el estado de carga del inicio de sesión
  isLoading: boolean = false;

  //Se inyectan los servicios necesarios en el constructor
  //FormBuilder para crear el formulario, Router para navegar a otras rutas y LoginService para manejar la lógica de inicio de sesión
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    //Se inicializa el formulario de inicio de sesión con los campos requeridos y sus validaciones
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Se establece el estado de carga a verdadero
      this.loginError = ''; // Se reinicia el error de inicio de sesión

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        //next se llama cuando la solicitud de inicio de sesión es exitosa
        next: () => {
          console.log('Login existoso, token recibido:');

          const authenticatedLogin = this.loginService.getAuthenticatedLogin();

          if (authenticatedLogin) {
            console.log('Usuario autenticado:', authenticatedLogin.username);
            console.log('Roles del usuario:', authenticatedLogin.roles);

            if (this.loginService.hasRole(LoginRol.ADMINISTRADOR)) {
              console.log('Redirigiendo al Dashboard de Administrador');
              this.router.navigate(['/dashboard-admin']);
            } else if (this.loginService.hasRole(LoginRol.ASISTENTE)) {
              console.log('Redirigiendo al Dashboard de Asistente');
              this.router.navigate(['/dashboard-asistente']);
            } else {
              console.error('El usuario no tiene roles válidos asignados.');
              this.router.navigate(['/dashboard-asistente']);
            }
          }

          this.loginForm.reset(); // Se reinicia el formulario de inicio de sesión
        },
        //error se llama cuando hay un error al obtener los datos del usuario y modifica la variable loginError
        error: (errorMessage) => {
          console.error('Error en el login:', errorMessage);
          this.loginError =
            errorMessage.error?.message || 'Error al iniciar sesión';
          this.isLoading = false; // Se establece el estado de carga a falso
        },
        //complete se llama cuando la solicitud de inicio de sesión se completa
        complete: () => {
          console.log('Proceso de login completado');
        },
      });
    } else {
      //Si el formulario no es válido, se muestra un mensaje de error en la consola y se marcan todos los campos como tocados
      console.log('Login failed');
      this.loginForm.markAllAsTouched();
      this.loginError = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
