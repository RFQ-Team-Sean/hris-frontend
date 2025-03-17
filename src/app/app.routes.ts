import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { payrollGuard } from './core/guards/payroll.guard';
import { employeeGuard } from './core/guards/employee.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent) },

  // Role-Based Dashboards
  { path: 'dashboard/admin', loadComponent: () => import('./modules/dashboard/pages/dashboard/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
  { path: 'dashboard/hr', loadComponent: () => import('./modules/dashboard/pages/dashboard/hr/hr-dashboard.component').then(m => m.HrDashboardComponent), canActivate: [hrGuard] },
  { path: 'dashboard/employee', loadComponent: () => import('./modules/dashboard/pages/dashboard/employee/employee-dashboard.component').then(m => m.EmployeeDashboardComponent), canActivate: [employeeGuard] },
  { path: 'dashboard/payroll', loadComponent: () => import('./modules/dashboard/pages/dashboard/payroll/payroll-dashboard.component').then(m => m.PayrollDashboardComponent), canActivate: [payrollGuard] },
  { path: 'dashboard/recruiter', loadComponent: () => import('./modules/dashboard/pages/dashboard/recruiter/recruiter-dashboard.component').then(m => m.RecruiterDashboardComponent), canActivate: [authGuard] },
  { path: 'dashboard/manager', loadComponent: () => import('./modules/dashboard/pages/dashboard/manager/manager-dashboard.component').then(m => m.ManagerDashboardComponent), canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
