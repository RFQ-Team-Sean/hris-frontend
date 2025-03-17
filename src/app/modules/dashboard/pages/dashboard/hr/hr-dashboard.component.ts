import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './hr-dashboard.component.html',
  styleUrl: './hr-dashboard.component.scss'
})
export class HrDashboardComponent {

}
