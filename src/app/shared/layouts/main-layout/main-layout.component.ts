import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NgClass, NgIf, NgFor],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  breadcrumbs: {label: string, path: string}[] = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' }
  ];
  userMenuOpen: boolean = false;
  currentYear: number = new Date().getFullYear();
  sidebarExpanded: boolean = true;
  user: any;
  
  constructor(public router: Router) {}
  
  ngOnInit() {
    // Get user from localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Update page title and breadcrumbs based on current route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageInfo(event.url);
      });
    
    // Check for sidebar state in localStorage
    const sidebarState = localStorage.getItem('sidebarExpanded');
    if (sidebarState !== null) {
      this.sidebarExpanded = sidebarState === 'true';
    }
    
    // Adjust for mobile devices
    if (window.innerWidth < 768) {
      this.sidebarExpanded = false;
    }
  }
  
  onSidebarToggle(expanded: boolean) {
    this.sidebarExpanded = expanded;
    localStorage.setItem('sidebarExpanded', String(expanded));
  }
  
  toggleMobileSidebar() {
    this.sidebarExpanded = true;
  }
  
  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    
    // Close menu when clicked outside
    if (this.userMenuOpen) {
      setTimeout(() => {
        window.addEventListener('click', this.closeUserMenu);
      }, 0);
    }
  }
  
  closeUserMenu = (event: any) => {
    const userMenuEl = document.querySelector('.user-menu');
    if (userMenuEl && !userMenuEl.contains(event.target)) {
      this.userMenuOpen = false;
      window.removeEventListener('click', this.closeUserMenu);
    }
  }
  
  updatePageInfo(url: string) {
    // Simple mapping of routes to page titles and breadcrumbs
    // In a real application, this could come from a route data or a service
    const pathSegments = url.split('/').filter(segment => segment);
    
    if (pathSegments.length === 0) {
      this.pageTitle = 'Dashboard';
      this.breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/dashboard' }
      ];
    } else {
      // Convert URL path to page title (e.g., personnel-management -> Personnel Management)
      const lastSegment = pathSegments[pathSegments.length - 1];
      this.pageTitle = lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Build breadcrumbs from path segments
      this.breadcrumbs = [{ label: 'Home', path: '/' }];
      
      let currentPath = '';
      pathSegments.forEach(segment => {
        currentPath += `/${segment}`;
        this.breadcrumbs.push({
          label: segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          path: currentPath
        });
      });
    }
  }
  
  logout() {
    // Implement logout logic
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
} 