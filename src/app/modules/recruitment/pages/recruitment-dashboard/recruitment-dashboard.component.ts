import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
@Component({
  selector: 'app-recruitment-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './recruitment-dashboard.component.html',
  styleUrl: './recruitment-dashboard.component.scss'
})
export class RecruitmentDashboardComponent {

}
