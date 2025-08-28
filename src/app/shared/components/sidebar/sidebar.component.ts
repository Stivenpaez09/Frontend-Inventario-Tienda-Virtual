import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  administrador: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isAdminitrador();
  }

  isAdminitrador(): boolean {
    if (this.loginService.isAdministrador() === true) {
      return (this.administrador = true);
    }

    return false;
  }

  logout() {
    this.loginService.logout();
  }

  homePage() {
    if (this.administrador) {
      this.router.navigate(['/dashboard-admin']);
    }

    if (!this.administrador) {
      this.router.navigate(['/dashboard-asistente']);
    }
  }
}
