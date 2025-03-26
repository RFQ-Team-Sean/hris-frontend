import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruitmentDashboardComponent } from './pages/recruitment-dashboard/recruitment-dashboard.component';
import { ApplicantTrackerComponent } from './pages/applicant-tracker/applicant-tracker.component';
import { JobListingsComponent } from './pages/job-listings/job-listings.component';
import { InterviewSchedulerComponent } from './pages/interview-scheduler/interview-scheduler.component';

const routes: Routes = [
  { path: 'recruitment-dashboard', component: RecruitmentDashboardComponent },
  { path: 'applicant-tracker', component: ApplicantTrackerComponent },
  { path: 'job-listings', component: JobListingsComponent },
  { path: 'interview-scheduler', component: InterviewSchedulerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
