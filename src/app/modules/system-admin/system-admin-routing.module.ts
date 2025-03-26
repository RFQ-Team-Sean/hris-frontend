import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AuditLogsComponent } from './pages/audit-logs/audit-logs.component';

const routes: Routes = [
  { path: 'user-management', component: UserManagementComponent },
  { path: 'audit-logs', component: AuditLogsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
