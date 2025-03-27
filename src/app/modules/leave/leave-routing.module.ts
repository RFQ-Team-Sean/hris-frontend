import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveDashboardComponent } from './pages/leave-dashboard/leave-dashboard.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { EmployeeLeaveDashboardComponent } from './pages/employee-leave-dashboard/employee-leave-dashboard.component';
import { LeaveBalanceHistoryComponent } from './leave-balance-history/leave-balance-history.component';
import { LeaveApprovalsComponent } from './pages/leave-approvals/leave-approvals.component';

const routes: Routes = [
  { path: 'leave-dashboard', component: LeaveDashboardComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'employee-leave-dashboard', component: EmployeeLeaveDashboardComponent },
  { path: 'leave-balance-history', component: LeaveBalanceHistoryComponent },
  { path: 'leave-approvals', component: LeaveApprovalsComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
