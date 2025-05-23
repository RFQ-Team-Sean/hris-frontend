import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { payrollGuard } from './core/guards/payroll.guard';
import { employeeGuard } from './core/guards/employee.guard';

export const routes: Routes = [
  // Public routes
  { path: 'login', loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent) },
  
  // Protected routes with MainLayout
  {
    path: '',
    loadComponent: () => import('./shared/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      // Role-Based Dashboards
      { path: 'dashboard/admin', loadComponent: () => import('./modules/dashboard/pages/dashboard/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
      { path: 'dashboard/hr', loadComponent: () => import('./modules/dashboard/pages/dashboard/hr/hr-dashboard.component').then(m => m.HrDashboardComponent), canActivate: [hrGuard] },
      { path: 'dashboard/employee', loadComponent: () => import('./modules/dashboard/pages/dashboard/employee/employee-dashboard.component').then(m => m.EmployeeDashboardComponent), canActivate: [employeeGuard] },
      { path: 'dashboard/payroll', loadComponent: () => import('./modules/dashboard/pages/dashboard/payroll/payroll-dashboard.component').then(m => m.PayrollDashboardComponent), canActivate: [payrollGuard] },
      { path: 'dashboard/recruiter', loadComponent: () => import('./modules/dashboard/pages/dashboard/recruiter/recruiter-dashboard.component').then(m => m.RecruiterDashboardComponent), canActivate: [authGuard] },
      { path: 'dashboard/manager', loadComponent: () => import('./modules/dashboard/pages/dashboard/manager/manager-dashboard.component').then(m => m.ManagerDashboardComponent), canActivate: [authGuard] },
      { path: 'dashboard', redirectTo: 'dashboard/admin', pathMatch: 'full' },
      
      // Feature modules
      { path: 'personnel-management', loadChildren: () => import('./modules/personnel-management/personnel-management.module').then(m => m.PersonnelManagementModule), canActivate: [authGuard] },
      { path: 'payroll', loadChildren: () => import('./modules/payroll/payroll.module').then(m => m.PayrollModule), canActivate: [authGuard] },
      { path: 'attendance', loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule), canActivate: [authGuard] },
      { path: 'leave', loadChildren: () => import('./modules/leave/leave.module').then(m => m.LeaveModule), canActivate: [authGuard] },
      { path: 'recruitment', loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule), canActivate: [authGuard] },
      { path: 'performance', loadChildren: () => import('./modules/performance/performance.module').then(m => m.PerformanceModule), canActivate: [authGuard] },
      { path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule), canActivate: [authGuard] },
      { path: 'employee-self-service', loadChildren: () => import('./modules/employee-self-service/employee-self-service.module').then(m => m.EmployeeSelfServiceModule), canActivate: [authGuard] },
      { path: 'system-admin', loadChildren: () => import('./modules/system-admin/system-admin.module').then(m => m.SystemAdminModule), canActivate: [authGuard] },
      { path: 'requests', loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule), canActivate: [authGuard] },
      { path: 'learning-development', loadChildren: () => import('./modules/learning-development/learning-development.module').then(m => m.LearningDevelopmentModule), canActivate: [authGuard] },
      { path: 'job-portal', loadChildren: () => import('./modules/job-portal/job-portal.module').then(m => m.JobPortalModule), canActivate: [authGuard] },
      
      // Default route for authenticated users
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback route
  { path: '**', redirectTo: '/login' }
];
