import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceDashboardComponent } from './pages/attendance-dashboard/attendance-dashboard.component';
import { EmployeeAttendanceComponent } from './pages/employee-attendance/employee-attendance.component';
import { WorkScheduleManagementComponent } from './pages/work-schedule-management/work-schedule-management.component';

const routes: Routes = [
  { path: 'attendance-dashboard', component: AttendanceDashboardComponent },
  { path: 'employee-attendance', component: EmployeeAttendanceComponent },
  { path: 'work-schedule-management', component: WorkScheduleManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
