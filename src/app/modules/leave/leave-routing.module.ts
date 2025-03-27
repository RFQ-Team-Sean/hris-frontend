import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveDashboardComponent } from './pages/leave-dashboard/leave-dashboard.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { EmployeeLeaveDashboardComponent } from './pages/employee-leave-dashboard/employee-leave-dashboard.component';

const routes: Routes = [
  { path: 'leave-dashboard', component: LeaveDashboardComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'employee-leave-dashboard', component: EmployeeLeaveDashboardComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
