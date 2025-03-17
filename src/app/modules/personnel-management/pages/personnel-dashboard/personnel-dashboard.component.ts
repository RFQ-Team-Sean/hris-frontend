import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-personnel-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './personnel-dashboard.component.html',
  styleUrls: ['./personnel-dashboard.component.scss']
})
export class PersonnelDashboardComponent {}
