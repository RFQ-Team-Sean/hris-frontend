import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-kpi-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.scss'
})
export class KpiDashboardComponent {

}
