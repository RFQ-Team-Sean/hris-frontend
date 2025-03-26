import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDashboardComponent } from './request-dashboard/request-dashboard.component';
import { DtrAdjustmentsComponent } from './pages/dtr-adjustments/dtr-adjustments.component';
import { LeaveRequestsComponent } from './pages/leave-requests/leave-requests.component';

const routes: Routes = [
  { path: 'request-dashboard', component: RequestDashboardComponent },
  { path: 'dtr-adjustments', component: DtrAdjustmentsComponent },
  { path: 'leave-requests', component: LeaveRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
