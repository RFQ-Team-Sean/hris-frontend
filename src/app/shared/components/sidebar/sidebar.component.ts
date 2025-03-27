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
    this.expandedMenus = {};
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
         { name: 'Personnel Management', path: '/personnel-management/personnel-dashboard', icon: 'trending_up' },
        { 
          name: 'Request Management', 
          path: '/requests/dtr-adjustments', 
          icon: 'attach_money',
          children: [
            { name: 'DTR Adjustments', path: '/requests/dtr-adjustments' },
            { name: 'Certifications & Membership Forms', path: '/requests/certifications-membership' },
            { name: 'Monetization Requests', path: '/requests/monetization-requests' },
            { name: 'Document Requests', path: '/requests/document-requests' },

          ]
        },
        { 
          name: 'Attendance & Timekeeping', 
          path: '/attendance/attendance-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Daily Time Record', path: '/attendance/attendance-dashboard' },
            { name: 'Work Schedule Management', path: '/attendance/work-schedule-management' },
          ]
        },
        { 
          name: 'Payroll Management', 
          path: '/payroll/payroll-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Employee Salary & Deductions', path: '/payroll/employee-salary' },
            { name: 'Payslips & Payroll Reports', path: '/payroll/payroll-audit-logs' },
            { name: 'Loan & Contribution Deductions', path: '/payroll/loan-deductions' },
          ]
        },
          { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'bar_chart' },
        { 
          name: 'Recruitment & Hiring', 
          path: '/recruitment/job-listings', 
          icon: 'attach_money',
          children: [
            { name: 'Job Openings Management', path: '/recruitment/job-listings' },
            { name: 'Applicant Tracker', path: '/recruitment/applicant-tracker' },
            { name: 'Interview & Assessment Scheduling', path: '/recruitment/interview-scheduler' },
          ]
        },
        { 
          name: 'Performance Management', 
          path: '/performance', 
          icon: 'attach_money',
          children: [
            { name: 'KPI dashboard', path: '/performance/kpi-dashboard' },
            { name: 'Employee Evaluation', path: '/performance/employee-self-assessment' },
            { name: 'Performance Report', path: '/reports/performance-reports' },
          ]
        },
        { 
          name: 'Learning & Development', 
          path: '/learning-development', 
          icon: 'attach_money',
          children: [
            { name: 'Training Program', path: '/learning-development/training-courses' },
            { name: 'Enrollment & Tracking', path: '/learning-development/enrollment' },
            { name: 'Certifications & Career Pathing', path: '/learning-development/certification' },
          ]
        },
        { name: 'Reports & Analytics', path: '/reports/report-dashboard', icon: 'trending_up' },
        { 
          name: 'System Administration', 
          path: '/system-admin', 
          icon: 'attach_money',
          children: [
            { name: 'User Management', path: '/system-admin/user-management' },
            { name: 'Audit Logs', path: '/system-admin/audit-logs' }
          ]
        },
        
      ],
      'HR': [
        { name: 'Dashboard', path: '/dashboard/admin', icon: 'dashboard' },
         { name: 'Personnel Management', path: '/personnel-management/personnel-dashboard', icon: 'trending_up' },
        { 
          name: 'Request Management', 
          path: '/requests/dtr-adjustments', 
          icon: 'attach_money',
          children: [
            { name: 'DTR Adjustments', path: '/requests/dtr-adjustments' },
            { name: 'Certifications & Membership Forms', path: '/requests/certifications-membership' },
            { name: 'Monetization Requests', path: '/requests/monetization-requests' },
            { name: 'Document Requests', path: '/requests/document-requests' },

          ]
        },
        { 
          name: 'Attendance & Timekeeping', 
          path: '/attendance/attendance-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Daily Time Record', path: '/attendance/attendance-dashboard' },
            { name: 'Work Schedule Management', path: '/attendance/work-schedule-management' },
          ]
        },
        { 
          name: 'Payroll Management', 
          path: '/payroll/payroll-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Employee Salary & Deductions', path: '/payroll/employee-salary' },
            { name: 'Payslips & Payroll Reports', path: '/payroll/payroll-audit-logs' },
            { name: 'Loan & Contribution Deductions', path: '/payroll/loan-deductions' },
          ]
        },
          { name: 'Leave Management', path: '/leave/leave-dashboard', icon: 'bar_chart' },
        { 
          name: 'Recruitment & Hiring', 
          path: '/recruitment/job-listings', 
          icon: 'attach_money',
          children: [
            { name: 'Job Openings Management', path: '/recruitment/job-listings' },
            { name: 'Applicant Tracker', path: '/recruitment/applicant-tracker' },
            { name: 'Interview & Assessment Scheduling', path: '/recruitment/interview-scheduler' },
          ]
        },
        { 
          name: 'Performance Management', 
          path: '/performance', 
          icon: 'attach_money',
          children: [
            { name: 'KPI dashboard', path: '/performance/kpi-dashboard' },
            { name: 'Employee Evaluation', path: '/performance/employee-self-assessment' },
            { name: 'Performance Report', path: '/reports/performance-reports' },
          ]
        },
        { 
          name: 'Learning & Development', 
          path: '/learning-development', 
          icon: 'attach_money',
          children: [
            { name: 'Training Program', path: '/learning-development/training-courses' },
            { name: 'Enrollment & Tracking', path: '/learning-development/enrollment' },
            { name: 'Certifications & Career Pathing', path: '/learning-development/certification' },
          ]
        },
        { name: 'Reports & Analytics', path: '/reports/report-dashboard', icon: 'trending_up' },
        { 
          name: 'System Administration', 
          path: '/system-admin', 
          icon: 'attach_money',
          children: [
            { name: 'User Management', path: '/system-admin/user-management' },
            { name: 'Audit Logs', path: '/system-admin/audit-logs' }
          ]
        },
        
      ],
      'Employee': [
        { name: 'Dashboard', path: '/dashboard/employee', icon: 'dashboard' },
        { name: 'My Profile', path: '/employee-self-service/my-profile', icon: 'person' },
        { 
          name: 'Attendance & Timekeeping', 
          path: '/attendance/employee-attendance', 
          icon: 'attach_money',
          children: [
            { name: 'My Daily Time Record', path: '/attendance/employee-attendance' },
            { name: 'DTR Adjustment', path: '/attendance/request-adjustment' },
            { name: 'Work Schedule & Shift Details', path: '/attendance/work-schedule-management' },
	          { name: 'Leave Application', path: '/leave/apply-leave' },
          ]
        },
        { 
          name: 'Payroll & Compensation', 
          path: '/employee-self-service/payslip-viewer', 
          icon: 'attach_money',
          children: [
            { name: 'View Payslips', path: '/employee-self-service/payslip-viewer' },
            { name: 'Loan & Contribution Deductions', path: '/payroll/loan-deductions' },
          ]
        },
        { 
          name: 'Leave & Benefits', 
          path: '/leave/leave-application-status', 
          icon: 'attach_money',
          children: [
            { name: 'Leave Application Status', path: '/leave/leave-application-status' },
            { name: 'Leave Balances & History', path: '/leave/leave-balance-history' },
          ]
        },
        { 
          name: 'Performance', 
          path: '/performance/kpi-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'KPIs & Performance', path: '/performance/kpi-dashboard' },
            { name: 'Self-Assessment & Feedback', path: '/performance/employee-self-assessment' },
          ]
        },
        { 
          name: 'Document Requests', 
          path: '/request/certifications-membership', 
          icon: 'attach_money',
          children: [
            { name: 'Certifications & Membership Forms', path: '/requests/certifications-membership' },
            { name: 'Monetization Requests', path: '/requests/monetization-requests' },
            { name: 'Document Requests', path: '/requests/document-requests' },
	        ]
        },
       ],
       'Payroll_Manager': [
        { name: 'Dashboard', path: '/dashboard/payroll', icon: 'dashboard' },
        { 
          name: 'Payroll Processing', 
          path: '/payroll/payroll-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Employee Salary Computation', path: '/payroll/payroll-dashboard' },
            { name: 'Loan & Deduction Processing', path: '/payroll/loan-deductions' }
          ]
        },
        { 
          name: 'Disbursement & Banking', 
          path: '/payroll/bank-files', 
          icon: 'attach_money',
          children: [
            { name: 'Generate Bank Files', path: '/payroll/bank-files' },
            { name: ' Pay Settlements', path: '/payroll/pay-settlements' }
          ]
        },
        { name: 'Reports & Analytics', path: '/reports/payroll-reports', icon: 'bar_chart' }
      ],
      'Recruiter': [
        { name: 'Dashboard', path: '/dashboard/recruiter', icon: 'dashboard' },
        { name: 'Job Openings Management', path: '/recruitment/job-listings', icon: 'list' },
        { name: 'Application Processing', path: '/recruitment/interview-scheduler', icon: 'assignment' },
        { name: 'Appointment Processing', path: '/recruitment/applicant-tracker', icon: 'assignment' },
        { name: 'Reports & Analytics', path: '/reports/recruitment-reports', icon: 'assignment' },
        
      ],
      'Manager': [
        { name: 'Dashboard', path: '/dashboard/manager', icon: 'dashboard' },
        { name: 'Team Management', path: '/personnel-management/personnel-dashboard', icon: 'schedule' },
        { 
          name: 'Attendance Monitoring', 
          path: '/attendance/attendance-dashboard', 
          icon: 'attach_money',
          children: [
            { name: 'Team Attendance Reports', path: 'attendance/attendance-dashboard' },
            { name: 'Adjustments & Approvals', path: '/requests/dtr-adjustments' },
	          { name: 'Work Schedule Management', path: '/attendance/work-schedule-management' }
          ]
        },
        { 
          name: 'Leave Management', 
          path: '/leave/leave-approvals', 
          icon: 'attach_money',
          children: [
            { name: 'Leave Request', path: '/leave/leave-approvals' },
            { name: 'Team Leave Balances & History', path: '/leave/leave-balance-history' }
          ]
        },
	      { name: 'Payroll Overview', path: '/payroll/payroll-dashboard', icon: 'trending_up' },
        { 
          name: 'Performance Management', 
          path: '/performance/manager-feedback', 
          icon: 'attach_money',
          children: [
            { name: '360-Degree Feedback', path: 'performance/manager-feedback' },
            { name: 'Monitor KPI Trends', path: '/performance/kpi-dashboard' }
          ]
        },
        { name: 'Reports & Analytics', path: '/reports/report-dashboard', icon: 'trending_up' }
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
