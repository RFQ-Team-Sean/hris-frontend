import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollDashboardComponent } from './pages/payroll-dashboard/payroll-dashboard.component';
import { PayslipGeneratorComponent } from './pages/payslip-generator/payslip-generator.component';

const routes: Routes = [
  { path: 'payroll-dashboard', component: PayrollDashboardComponent },
  { path: 'payslip-generator', component: PayslipGeneratorComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
