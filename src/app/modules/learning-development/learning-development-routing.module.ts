import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificationComponent } from './pages/certification/certification.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { TrainingCoursesComponent } from './pages/training-courses/training-courses.component';

const routes: Routes = [
  { path: 'certification', component: CertificationComponent },
  { path: 'enrollment', component: EnrollmentComponent },
  { path: 'training-courses', component: TrainingCoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningDevelopmentRoutingModule { }
