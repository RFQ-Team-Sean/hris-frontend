import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isSidebarExpanded: boolean = true;
  @Input() currentUser: any;
  
  notifications: any[] = [
    { id: 1, message: 'Your leave request has been approved', time: '5 min ago', read: false },
    { id: 2, message: 'New policy update has been published', time: '1 hour ago', read: false },
    { id: 3, message: 'You have 2 pending timesheet approvals', time: '3 hours ago', read: true }
  ];
  
  isNotificationsOpen: boolean = false;
  isProfileMenuOpen: boolean = false;
  
  constructor(private router: Router) {}
  
  toggleNotificationsDropdown() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isProfileMenuOpen = false;
    }
  }
  
  toggleProfileDropdown() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    if (this.isProfileMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }
  
  markAllAsRead() {
    this.notifications.forEach(notif => notif.read = true);
  }
  
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
  
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
} 