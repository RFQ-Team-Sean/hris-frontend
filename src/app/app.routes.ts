import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { payrollGuard } from './core/guards/payroll.guard';
import { employeeGuard } from './core/guards/employee.guard';

export const routes: Routes = [
  // Login Page
  { path: 'login', loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent) },

  // Role-Specific Routes
  { path: 'admin', loadChildren: () => import('./modules/system-admin/system-admin.module').then(m => m.SystemAdminModule), canActivate: [adminGuard] },
  { path: 'personnel', loadChildren: () => import('./modules/personnel-management/personnel-management.module').then(m => m.PersonnelManagementModule), canActivate: [hrGuard] },
  { path: 'payroll', loadChildren: () => import('./modules/payroll/payroll.module').then(m => m.PayrollModule), canActivate: [payrollGuard] },
  { path: 'self-service', loadChildren: () => import('./modules/employee-self-service/employee-self-service.module').then(m => m.EmployeeSelfServiceModule), canActivate: [employeeGuard] },
  { path: 'recruitment', loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule), canActivate: [authGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
