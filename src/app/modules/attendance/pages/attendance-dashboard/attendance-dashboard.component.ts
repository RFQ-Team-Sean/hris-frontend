import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './attendance-dashboard.component.html',
  styleUrl: './attendance-dashboard.component.scss'
})
export class AttendanceDashboardComponent {

}
