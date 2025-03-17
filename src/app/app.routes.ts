import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { payrollGuard } from './core/guards/payroll.guard';
import { employeeGuard } from './core/guards/employee.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Common Routes (accessible by all authenticated users)
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },

  // HR Module (Restricted to HR & Admin)
  { path: 'personnel', loadChildren: () => import('./modules/personnel-management/personnel-management.module').then(m => m.PersonnelManagementModule), canActivate: [hrGuard] },

  // Payroll Module (Restricted to Payroll & Admin)
  { path: 'payroll', loadChildren: () => import('./modules/payroll/payroll.module').then(m => m.PayrollModule), canActivate: [payrollGuard] },

  // Employee Self-Service (Accessible by all employees)
  { path: 'self-service', loadChildren: () => import('./modules/employee-self-service/employee-self-service.module').then(m => m.EmployeeSelfServiceModule), canActivate: [employeeGuard] },

  // System Admin (Admin Only)
  { path: 'admin', loadChildren: () => import('./modules/system-admin/system-admin.module').then(m => m.SystemAdminModule), canActivate: [adminGuard] },

  // Wildcard for unknown routes
  { path: '**', redirectTo: '/dashboard' }
];

