import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent], 
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {

}
