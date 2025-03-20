import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { ContentWrapperComponent } from '../../../../../shared/components/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, ContentWrapperComponent], 
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
