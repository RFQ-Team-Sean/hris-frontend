import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard.component';
import { PayrollReportsComponent } from './pages/payroll-reports/payroll-reports.component';
import { LeaveReportsComponent } from './pages/leave-reports/leave-reports.component';
import { AttendanceReportsComponent } from './pages/attendance-reports/attendance-reports.component';
import { CustomReportsComponent } from './pages/custom-reports/custom-reports.component';
import { HrReportsComponent } from './pages/hr-reports/hr-reports.component';
import { PerformanceReportsComponent } from './pages/performance-reports/performance-reports.component';

const routes: Routes = [
  { path: 'report-dashboard', component: ReportDashboardComponent },
  { path: 'payroll-reports', component: PayrollReportsComponent },
  { path: 'leave-reports', component: LeaveReportsComponent },
  { path: 'attendance-reports', component: AttendanceReportsComponent },
  { path: 'custom-reports', component: CustomReportsComponent },
  { path: 'hr-reports', component: HrReportsComponent },
  { path: 'performance-reports', component: PerformanceReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
