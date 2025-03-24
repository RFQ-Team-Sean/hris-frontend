import { Component, OnInit, Output, EventEmitter, AfterViewInit, HostBinding, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import 'hammerjs';

interface MenuItem {
  name: string;
  path: string;
  icon: string;
  children?: { name: string; path: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        width: '250px',
        transform: 'translateX(0)'
      })),
      state('collapsed', style({
        width: '65px',
        transform: 'translateX(0)'
      })),
      state('mobile-expanded', style({
        width: '100%',
        maxWidth: '300px',
        transform: 'translateX(0)'
      })),
      state('mobile-collapsed', style({
        width: '100%',
        maxWidth: '300px',
        transform: 'translateX(-100%)'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('mobile-expanded <=> mobile-collapsed', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();
  @HostBinding('class.mobile-visible') get isMobileVisible() { return this.isExpanded && this.isMobile; }
  
  isMobile: boolean = false;
  touchStartX: number = 0;
  touchEndX: number = 0;
  touchStartY: number = 0;
  touchEndY: number = 0;
  swipeThreshold: number = 50;
  swipeAngleThreshold: number = 30;
  
  user: any;
  menuItems: MenuItem[] = [];
  isExpanded: boolean = true;
  expandedMenus: { [key: string]: boolean } = {};
  availableRoles: string[] = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  
  constructor(private router: Router) {
    this.expandedMenus = {
      hrAdmin: false,
      payroll: false,
      sysAdmin: false
    };
    this.checkMobileView();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobileView();
  }

  private checkMobileView() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (!wasMobile && this.isMobile) {
      this.isExpanded = false;
      this.toggleSidebarEvent.emit(false);
    } else if (wasMobile && !this.isMobile) {
      this.isExpanded = true;
      this.toggleSidebarEvent.emit(true);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  private handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);
    
    // Only handle horizontal swipes (angle less than threshold from horizontal)
    if (angle < this.swipeAngleThreshold || angle > (180 - this.swipeAngleThreshold)) {
      if (Math.abs(deltaX) >= this.swipeThreshold) {
        if (deltaX > 0 && !this.isExpanded) {
          this.toggleSidebar();
        } else if (deltaX < 0 && this.isExpanded) {
          this.closeMobileSidebar();
        }
      }
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      document.body.style.overflow = !this.isExpanded ? 'hidden' : 'auto';
    }
    this.isExpanded = !this.isExpanded;
    this.toggleSidebarEvent.emit(this.isExpanded);
  }

  closeMobileSidebar() {
    if (this.isMobile && this.isExpanded) {
      document.body.style.overflow = 'auto';
      this.isExpanded = false;
      this.toggleSidebarEvent.emit(false);
    }
  }

  ngOnInit() {
    // Get the logged-in user from localStorage
    let storedUser = localStorage.getItem('user');
    
    // If user isn't in localStorage, create a default Admin user
    if (!storedUser) {
      const defaultUser = { 
        name: 'Admin User', 
        role: 'Admin',
        email: 'admin@example.com'
      };
      localStorage.setItem('user', JSON.stringify(defaultUser));
      storedUser = JSON.stringify(defaultUser);
    }
    
    this.user = JSON.parse(storedUser);
    
    // Normalize role
    if (!this.user.role) {
      this.user.role = 'Admin';
    }

    // Load menu based on user role
    this.loadMenuItems();
    
    // Subscribe to router events to handle active menu highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handleRouteChange(event.url);
      });
      
    // Update the current user to ensure role is set
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  
  ngAfterViewInit() {
    // Expand menus that contain the current route on initial load
    setTimeout(() => {
      this.handleRouteChange(this.router.url);
    }, 0);
  }
  
  handleRouteChange(url: string) {
    // Automatically expand menus based on current route
    if (url.includes('/personnel-management')) {
      this.expandedMenus['hrAdmin'] = true;
    }
    
    if (url.includes('/payroll')) {
      this.expandedMenus['payroll'] = true;
    }
    
    if (url.includes('/system-admin')) {
      this.expandedMenus['sysAdmin'] = true;
    }
    
    // If at root path, redirect to dashboard
    if (url === '/') {
      this.navigateToDashboard();
    }
  }
  
  navigateToDashboard() {
    const role = this.user?.role || 'Admin';
    let dashboardRoute = '/dashboard';
    
    // Route to role-specific dashboard if available
    if (role === 'Admin') {
      dashboardRoute = '/dashboard/admin';
    } else if (role === 'HR') {
      dashboardRoute = '/dashboard/hr';
    } else if (role === 'Employee') {
      dashboardRoute = '/dashboard/employee';
    } else if (role === 'Payroll_Manager') {
      dashboardRoute = '/dashboard/payroll';
    } else if (role === 'Recruiter') {
      dashboardRoute = '/dashboard/recruiter';
    } else if (role === 'Manager') {
      dashboardRoute = '/dashboard/manager';
    }
    
    this.router.navigate([dashboardRoute]);
  }

  loadMenuItems() {
    // Define menu structure with explicit type
    const menus: { [key: string]: MenuItem[] } = {
      'Admin': [
        { name: 'Dashboard', path: '/dashboard/admin', icon: 'dashboard' },
        { 
          name: 'HR Admin', 
          path: '/personnel-management', 
          icon: 'people',
          children: [
            { name: 'Personnel 201 File', path: '/personnel-management/personnel-dashboard' },
            { name: 'Requests', path: '/personnel-management/requests' },
            { name: 'Manage Personnel', path: '/personnel-management/employee-list' },
            { name: 'Employee Reports', path: '/personnel-management/reports' }
          ]
        },
        { 
          name: 'Payroll', 
          path: '/payroll', 
          icon: 'attach_money',
          children: [
            { name: 'Overview', path: '/payroll/payroll-dashboard' },
            { name: 'Tax Calculator', path: '/payroll/tax-calculator' }
          ]
        },
        { name: 'Attendance', path: '/attendance/attendance-dashboard', icon: 'schedule' },
        { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'event' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' },
        { 
          name: 'System Admin', 
          path: '/system-admin', 
          icon: 'settings',
          children: [
            { name: 'User Management', path: '/system-admin/user-management' },
            { name: 'Audit Trail', path: '/system-admin/audit-trail' }
          ]
        }
      ],
      'HR': [
        { name: 'Dashboard', path: '/dashboard/hr', icon: 'dashboard' },
        { 
          name: 'HR Admin', 
          path: '/personnel-management', 
          icon: 'people',
          children: [
            { name: 'Personnel 201 File', path: '/personnel-management/personnel-dashboard' },
            { name: 'Requests', path: '/personnel-management/requests' },
            { name: 'Manage Personnel', path: '/personnel-management/employee-list' },
            { name: 'Employee Reports', path: '/personnel-management/reports' }
          ]
        },
        { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'event' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' }
      ],
      'Employee': [
        { name: 'Dashboard', path: '/dashboard/employee', icon: 'dashboard' },
        { name: 'My Profile', path: '/employee-self-service/my-profile', icon: 'person' },
        { name: 'Self-Service', path: '/employee-self-service/employee-dashboard', icon: 'build' },
        { name: 'Attendance', path: '/attendance/employee-attendance', icon: 'schedule' },
        { name: 'Payslip Viewer', path: '/payroll/payslip-generator', icon: 'attach_money' },
        { name: 'Leave Requests', path: '/leave/apply-leave', icon: 'event' }
      ],
      'Payroll_Manager': [
        { name: 'Dashboard', path: '/dashboard/payroll', icon: 'dashboard' },
        { 
          name: 'Payroll', 
          path: '/payroll', 
          icon: 'attach_money',
          children: [
            { name: 'Overview', path: '/payroll/payroll-dashboard' },
            { name: 'Tax Calculator', path: '/payroll/tax-calculator' }
          ]
        },
        { name: 'Payslip Viewer', path: '/payroll/payslip-generator', icon: 'receipt' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' }
      ],
      'Recruiter': [
        { name: 'Dashboard', path: '/dashboard/recruiter', icon: 'dashboard' },
        { name: 'Recruitment', path: '/recruitment/recruitment-dashboard', icon: 'work' },
        { name: 'Applicant Tracker', path: '/recruitment/applicant-tracker', icon: 'assignment' },
        { name: 'Job Listings', path: '/recruitment/job-listings', icon: 'list' }
      ],
      'Manager': [
        { name: 'Dashboard', path: '/dashboard/manager', icon: 'dashboard' },
        { name: 'Team Overview', path: '/team-overview', icon: 'group' },
        { name: 'Attendance', path: '/attendance/attendance-dashboard', icon: 'schedule' },
        { name: 'Reports', path: '/reports/report-dashboard', icon: 'bar_chart' },
        { name: 'Performance', path: '/performance/kpi-dashboard', icon: 'trending_up' }
      ]
    };

    // Get user role and assign menu
    const role = this.user?.role || 'Admin';
    this.menuItems = menus[role] || menus['Admin']; // Fallback to Admin if role not found
  }
  
  toggleSubmenu(key: string) {
    if (this.isExpanded) {
      this.expandedMenus[key] = !this.expandedMenus[key];
    } else {
      // If sidebar is collapsed, expand it first and then open the submenu
      this.isExpanded = true;
      this.toggleSidebarEvent.emit(this.isExpanded);
      setTimeout(() => {
        this.expandedMenus[key] = true;
      }, 300);
    }
  }
  
  // Get simple menu items without children
  getSimpleMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => 
      !item.children && 
      item.name !== 'Dashboard' && 
      item.name !== 'HR Admin' && 
      item.name !== 'Payroll' &&
      item.name !== 'System Admin'
    );
  }
  
  // Check if menu contains a specific item
  hasMenuItem(name: string): boolean {
    return this.menuItems.some(item => item.name === name);
  }

  switchRole(role: string) {
    // Show confirmation first
    const confirm = window.confirm(`Switch to ${role.replace('_', ' ')} role?`);
    
    if (confirm) {
      // In a real app, you might want to call an API to verify the role switch
      // For now, we'll just update the localStorage
      this.user = { ...this.user, role: role };
      localStorage.setItem('user', JSON.stringify(this.user));
      
      // Reload menu items based on new role
      this.loadMenuItems();
      
      // Reload the current page to reflect the new role's permissions
      // In a real app, you might want to navigate to a specific page for the role
      this.navigateToDashboard();
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route) && route !== '/dashboard';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getAnimationState() {
    if (this.isMobile) {
      return this.isExpanded ? 'mobile-expanded' : 'mobile-collapsed';
    }
    return this.isExpanded ? 'expanded' : 'collapsed';
  }
}
