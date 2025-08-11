import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../../core/services/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
}
