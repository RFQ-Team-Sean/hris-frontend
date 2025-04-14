// src\app\modules\leave\pages\leave-dashboard\leave-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-leave-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './leave-dashboard.component.html',
  styleUrl: './leave-dashboard.component.scss'
})
export class LeaveDashboardComponent implements OnInit {
  leaveApplications$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;
  leaveTypes$: Observable<any[]>;

  // Combined data for template
  leaveApplicationsWithDetails$: Observable<any[]>;

  constructor(private dummyDataService: DummyDataService) {
    this.leaveApplications$ = this.dummyDataService.getLeaveApplications();
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();
    this.leaveTypes$ = this.dummyDataService.getLeaveTypes();

    // Combine data for the template
    this.leaveApplicationsWithDetails$ = combineLatest([
      this.leaveApplications$,
      this.personnel$,
      this.departments$,
      this.leaveTypes$
    ]).pipe(
      map(([applications, personnel, departments, leaveTypes]) => {
        return applications.map(app => {
          const person = personnel.find(p => p.id === app.personnel_id);
          const dept = departments.find(d => d.id === person?.department_id);
          const leaveType = leaveTypes.find(lt => lt.id === app.leave_type_id);
          
          return {
            ...app,
            personnel_name: person ? `${person.first_name} ${person.last_name}` : 'Unknown',
            department_name: dept?.department_name || 'Unknown',
            leave_type_name: leaveType?.leave_type_name || 'Unknown',
            duration: this.calculateDuration(app.start_date, app.end_date)
          };
        });
      })
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Format date
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Calculate duration between dates
  calculateDuration(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Pending':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Approved':
        return { background: '#ecfdf5', text: '#065f46' };
      case 'Rejected':
        return { background: '#fee2e2', text: '#b91c1c' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Handle approve action
  approveLeave(applicationId: string): void {
    // TODO: Implement approve logic
    console.log('Approving leave application:', applicationId);
  }

  // Handle reject action
  rejectLeave(applicationId: string): void {
    // TODO: Implement reject logic
    console.log('Rejecting leave application:', applicationId);
  }

  // Handle view action
  viewLeave(applicationId: string): void {
    // TODO: Implement view logic
    console.log('Viewing leave application:', applicationId);
  }
}