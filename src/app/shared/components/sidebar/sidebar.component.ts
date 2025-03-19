import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';

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
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        width: '250px',
      })),
      state('collapsed', style({
        width: '65px',
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();
  
  user: any;
  menuItems: MenuItem[] = [];
  isExpanded: boolean = true;
  expandedMenus: { [key: string]: boolean } = {};
  availableRoles: string[] = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  
  constructor(private router: Router) {
    // Initialize default expanded menus
    this.expandedMenus = {
      hrAdmin: false,
      payroll: false,
      sysAdmin: false
    };
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
            { name: 'Manage Personnel', path: '/personnel-management/manage' },
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
            { name: 'Manage Personnel', path: '/personnel-management/manage' },
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

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebarEvent.emit(this.isExpanded);
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
}
