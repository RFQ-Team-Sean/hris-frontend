import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelDashboardComponent } from './pages/personnel-dashboard/personnel-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { PersonnelMovementComponent } from './pages/personnel-movement/personnel-movement.component';

const routes: Routes = [
  { path: 'personnel-dashboard', component: PersonnelDashboardComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'personnel-movement', component: PersonnelMovementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelManagementRoutingModule {}