import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantTrackerComponent } from './pages/applicant-tracker/applicant-tracker.component';
import { JobListingsComponent } from './pages/job-listings/job-listings.component';
import { InterviewSchedulerComponent } from './pages/interview-scheduler/interview-scheduler.component';
import { RecruitmentDashboardComponent } from './pages/recruitment-dashboard/recruitment-dashboard.component';

const routes: Routes = [

  { path: 'applicant-tracker', component: ApplicantTrackerComponent },
  { path: 'job-listings', component: JobListingsComponent },
  { path: 'interview-scheduler', component: InterviewSchedulerComponent },
  { path: 'recruitment-dashboard', component: RecruitmentDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
