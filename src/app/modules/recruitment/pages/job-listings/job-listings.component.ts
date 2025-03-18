import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.scss'
})
export class JobListingsComponent {

}
