import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PayslipViewerComponent } from './pages/payslip-viewer/payslip-viewer.component';

const routes: Routes = [
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'payslip-viewer', component: PayslipViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSelfServiceRoutingModule { }
