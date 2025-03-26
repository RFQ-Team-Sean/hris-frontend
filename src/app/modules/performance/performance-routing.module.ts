import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KpiDashboardComponent } from './pages/kpi-dashboard/kpi-dashboard.component';
import { EmployeeSelfAssessmentComponent } from './pages/employee-self-assessment/employee-self-assessment.component';
import { ManagerFeedbackComponent } from './pages/manager-feedback/manager-feedback.component';

const routes: Routes = [
  { path: 'kpi-dashboard', component: KpiDashboardComponent },
  { path: 'employee-self-assessment', component: EmployeeSelfAssessmentComponent },
  { path: 'manager-feedback', component: ManagerFeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
