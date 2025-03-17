import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceDashboardComponent } from './pages/attendance-dashboard/attendance-dashboard.component';
import { EmployeeAttendanceComponent } from './pages/employee-attendance/employee-attendance.component';

const routes: Routes = [
  { path: 'attendance-dashboard', component: AttendanceDashboardComponent },
  { path: 'employee-attendance', component: EmployeeAttendanceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
