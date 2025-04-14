import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-loan-deductions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-deductions.component.html',
  styleUrls: ['./loan-deductions.component.scss']
})
export class LoanDeductionsComponent implements OnInit {
  deductions$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;
  
  // Summary calculations
  totalMonthlyDeductions$: Observable<number>;
  totalSssContributions$: Observable<number>;
  totalPagibigContributions$: Observable<number>;

  // Combined data for template
  personnelWithDepartments$: Observable<any[]>;

  constructor(private dummyDataService: DummyDataService) {
    this.deductions$ = this.dummyDataService.getDeductions();
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine personnel and departments data
    this.personnelWithDepartments$ = combineLatest([this.personnel$, this.departments$]).pipe(
      map(([personnel, departments]) => {
        return personnel.map(p => ({
          ...p,
          department_name: departments.find(d => d.id === p.department_id)?.department_name || 'Unknown'
        }));
      })
    );

    // Calculate totals
    this.totalMonthlyDeductions$ = this.deductions$.pipe(
      map(deductions => deductions.reduce((sum, d) => sum + this.calculateTotalDeductions(d), 0))
    );

    this.totalSssContributions$ = this.deductions$.pipe(
      map(deductions => deductions.reduce((sum, d) => sum + d.sss, 0))
    );

    this.totalPagibigContributions$ = this.deductions$.pipe(
      map(deductions => deductions.reduce((sum, d) => sum + d.pagibig, 0))
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return amount ? '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '-';
  }

  // Format date
  formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Active':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Pending Approval':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Completed':
        return { background: '#e5e7eb', text: '#4b5563' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Calculate total deductions
  calculateTotalDeductions(deduction: any): number {
    return deduction.bir + deduction.pagibig + deduction.philhealth + deduction.sss + deduction.loans + deduction.other_deductions;
  }

  // Get personnel name by ID
  getPersonnelName(personnelId: string, personnelList: any[] | null): string {
    if (!personnelList) return 'Unknown';
    const personnel = personnelList.find(p => p.id === personnelId);
    return personnel ? `${personnel.first_name} ${personnel.last_name}` : 'Unknown';
  }

  // Get personnel department by ID
  getPersonnelDepartment(personnelId: string, personnelList: any[] | null): string {
    if (!personnelList) return 'Unknown';
    const personnel = personnelList.find(p => p.id === personnelId);
    if (!personnel) return 'Unknown';
    
    return personnel.department_name || 'Unknown';
  }

  // In a real app, you would have methods to:
  // - Fetch deductions from API
  // - Handle filter changes
  // - Approve/reject pending loans
  // - Add/edit deductions
  // - Stop active deductions
}