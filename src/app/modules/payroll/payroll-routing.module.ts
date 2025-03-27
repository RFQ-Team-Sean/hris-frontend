import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollDashboardComponent } from './pages/payroll-dashboard/payroll-dashboard.component';
import { PayslipGeneratorComponent } from './pages/payslip-generator/payslip-generator.component';
import { EmployeeSalaryComponent } from './pages/employee-salary/employee-salary.component';
import { LoanDeductionsComponent } from './pages/loan-deductions/loan-deductions.component';
import { TaxCalculatorComponent } from './pages/tax-calculator/tax-calculator.component';
import { DisbursementBankingDashboardComponent } from './pages/disbursement-banking-dashboard/disbursement-banking-dashboard.component';

const routes: Routes = [
  { path: 'payroll-dashboard', component: PayrollDashboardComponent },
  { path: 'payslip-generator', component: PayslipGeneratorComponent },
  { path: 'employee-salary', component: EmployeeSalaryComponent },
  { path: 'loan-deductions', component: LoanDeductionsComponent },
  { path: 'tax-calculator', component: TaxCalculatorComponent },
  { path: 'disbursement-banking-dashboard', component: DisbursementBankingDashboardComponent }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
