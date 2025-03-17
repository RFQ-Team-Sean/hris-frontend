import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelDashboardComponent } from './pages/personnel-dashboard/personnel-dashboard.component';

const routes: Routes = [
  { path: 'personnel-dashboard', component: PersonnelDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelManagementRoutingModule {}
