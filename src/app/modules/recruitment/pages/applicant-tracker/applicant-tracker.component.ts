import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-applicant-tracker',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './applicant-tracker.component.html',
  styleUrl: './applicant-tracker.component.scss'
})
export class ApplicantTrackerComponent {

}
