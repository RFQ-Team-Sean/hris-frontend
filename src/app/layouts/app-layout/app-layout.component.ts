import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations: [
    trigger('mainContentAnimation', [
      state('expanded', style({
        marginLeft: '250px'
      })),
      state('collapsed', style({
        marginLeft: '65px'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AppLayoutComponent implements OnInit {
  isSidebarExpanded: boolean = true;
  currentUser: any;

  ngOnInit(): void {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      // Create a default user if none exists (for development)
      this.currentUser = {
        name: 'Admin User',
        role: 'Admin',
        email: 'admin@example.com'
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
  }

  onToggleSidebar(isExpanded: boolean): void {
    this.isSidebarExpanded = isExpanded;
  }
} 