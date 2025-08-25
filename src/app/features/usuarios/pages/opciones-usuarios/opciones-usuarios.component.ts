import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../../../core/services/message.service';
import { ShowLogin } from '../../models/login.model';
import { EditarAtributosUsuarioComponent } from '../../components/editar-atributos-usuario/editar-atributos-usuario.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-opciones-usuarios',
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './opciones-usuarios.component.html',
  styleUrl: './opciones-usuarios.component.scss',
})
export class OpcionesUsuariosComponent implements OnInit {
  private id_usuario: number | null = null;
  usuario: ShowLogin | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRouter: ActivatedRoute,
    private dialog: MatDialog,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_usuario = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    // Validar que el id_usuario sea un numero valido
    if (!this.id_usuario || isNaN(this.id_usuario)) {
      this.message.showWarning('ID invalido');
      this.router.navigate(['/ver-usuarios']);
      return;
    }

    this.findUsuario(this.id_usuario);
  }

  findUsuario(id_usuario: number) {
    this.usuarioService.findLogin(id_usuario).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al cargar el usuario'
        );
        this.router.navigate(['/ver-usuarios']);
      },
    });
  }

  openFormEdit(label: string, attribute: string, value: string) {
    const dialogRef = this.dialog.open(EditarAtributosUsuarioComponent, {
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
            this.usuarioService
              .updateNombreLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.nombre = result.value;
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el nombre del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'apellido') {
            this.usuarioService
              .updateApellidoLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.apellido = result.value;
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el apellido del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'fecha_nacimiento') {
            this.usuarioService
              .updateFechaNacimientoLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.fechaNacimiento = result.value;
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar la fecha de nacimiento del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'telefono') {
            this.usuarioService
              .updateTelefonoLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.telefono = result.value;
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el telefono del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'direccion') {
            this.usuarioService
              .updateDireccionLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.direccion = result.value;
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar la direccion del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'password') {
            this.usuarioService
              .updatePasswordLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el password del usuario'
                  );
                },
              });
          }

          if (result.attribute === 'unRol') {
            this.usuarioService
              .updateRolLogin(this.id_usuario!, result.value)
              .subscribe({
                next: (response) => {
                  this.usuario!.rol =
                    result.value === 1 ? 'administrador' : 'asistente';
                  this.message.showWarning(response.message);
                },
                error: (error) => {
                  this.message.showWarning(
                    error.error?.message ||
                      'Error al actualizar el password del usuario'
                  );
                },
              });
          }
        }
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message ||
            'Error al abrir el formulario de actualizar usuario. '
        );
      },
    });
  }
}
