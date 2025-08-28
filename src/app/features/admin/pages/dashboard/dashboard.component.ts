import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { LoginService } from '../../../../core/services/login.service';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { LoginProfile } from '../../../../core/models/auth.interfaces';
import { MessageService } from '../../../../core/services/message.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: LoginProfile | null = null;

  constructor(
    private loginService: LoginService,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.getLoginProfile();
  }

  getLoginProfile(): void {
    this.loginService.getLoginProfile().subscribe({
      next: (login) => {
        this.user = login;
      },
      error: (error) => {
        this.message.showWarning(
          error.error?.message || 'Error al obtener el perfil del usuario'
        );
      },
    });
  }
}
