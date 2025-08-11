import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { LoginService } from '../../../../core/services/login.service';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Suscripcion al estado del login
  }

  ngOnDestroy() {}
}
