import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-payslip-generator',
  standalone: true,
  imports: [RouterModule, SidebarComponent ],
  templateUrl: './payslip-generator.component.html',
  styleUrl: './payslip-generator.component.scss'
})
export class PayslipGeneratorComponent {

}
