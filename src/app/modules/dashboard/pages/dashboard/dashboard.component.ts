import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component'; 

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [RouterModule, SidebarComponent], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
