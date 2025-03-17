import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-payroll-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './payroll-dashboard.component.html',
  styleUrl: './payroll-dashboard.component.scss'
})
export class PayrollDashboardComponent {

}
