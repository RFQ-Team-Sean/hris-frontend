import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDashboardComponent } from './request-dashboard/request-dashboard.component';
import { DtrAdjustmentsComponent } from './pages/dtr-adjustments/dtr-adjustments.component';
import { LeaveRequestsComponent } from './pages/leave-requests/leave-requests.component';
import { CertificationsMembershipComponent } from './pages/certifications-membership/certifications-membership.component';
import { MonetizationRequestsComponent } from './pages/monetization-requests/monetization-requests.component';
import { DocumentRequestsComponent } from './pages/document-requests/document-requests.component';

const routes: Routes = [
  { path: 'request-dashboard', component: RequestDashboardComponent },
  { path: 'dtr-adjustments', component: DtrAdjustmentsComponent },
  { path: 'leave-requests', component: LeaveRequestsComponent },
  { path: 'certifications-membership', component: CertificationsMembershipComponent },
  { path: 'monetization-requests', component: MonetizationRequestsComponent },
  { path: 'document-requests', component: DocumentRequestsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
