import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { EventsComponent } from './pages/events/events.component';
import { HealthAssessmentComponent } from './pages/health-assessment/health-assessment.component';

const routes: Routes = [
    {path: 'health-dashboard',component: DashboardComponent},
    {path: 'resources',component: ResourcesComponent},
    {path: 'events',component: EventsComponent},
    {path: 'health-assessment', component: HealthAssessmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
