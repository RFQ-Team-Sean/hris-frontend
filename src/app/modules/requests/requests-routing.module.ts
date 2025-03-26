import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDashboardComponent } from './request-dashboard/request-dashboard.component';

const routes: Routes = [
  { path: 'report-dashboard', component: RequestDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
