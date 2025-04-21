import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationStatusComponent } from './pages/application-status/application-status.component';
import { JobApplicationComponent } from './pages/job-application/job-application.component';
import { JobSearchComponent } from './pages/job-search/job-search.component';

const routes: Routes = [
  { path: 'application-status', component: ApplicationStatusComponent },
  { path: 'job-application', component: JobApplicationComponent },
  { path: 'job-search', component: JobSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPortalRoutingModule { }
