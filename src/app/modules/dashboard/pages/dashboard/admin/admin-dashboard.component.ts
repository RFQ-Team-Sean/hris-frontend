import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent], 
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
