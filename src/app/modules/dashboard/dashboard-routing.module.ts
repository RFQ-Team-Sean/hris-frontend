import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManagerDashboardComponent } from './pages/dashboard/manager/manager-dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // Loads the dashboard component by default
  { path: 'manager-dashboard', component: ManagerDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
