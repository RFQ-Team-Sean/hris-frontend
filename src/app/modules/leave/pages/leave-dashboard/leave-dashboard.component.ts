// src\app\modules\leave\pages\leave-dashboard\leave-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LeaveApplicationModalComponent } from './leave-application-modal.component';
import { LeaveConfirmationModalComponent } from './leave-confirmation-modal.component';

@Component({
  selector: 'app-leave-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LeaveApplicationModalComponent, LeaveConfirmationModalComponent],
  templateUrl: './leave-dashboard.component.html',
  styleUrl: './leave-dashboard.component.scss'
})
export class LeaveDashboardComponent implements OnInit {
  // Make Math available in template
  protected Math = Math;

  leaveApplications$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;
  leaveTypes$: Observable<any[]>;

  // Filter states
  statusFilter = new BehaviorSubject<string>('');
  leaveTypeFilter = new BehaviorSubject<string>('');
  dateFilter = new BehaviorSubject<string>('');

  // Pagination states
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Combined data for template
  leaveApplicationsWithDetails$: Observable<any[]>;
  filteredApplications$: Observable<any[]>;

  // Modal states
  isViewModalOpen = false;
  isConfirmModalOpen = false;
  selectedApplication: any = null;
  isProcessing = false;
  confirmAction: 'approve' | 'reject' = 'approve';

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

    // Apply filters and pagination
    this.filteredApplications$ = combineLatest([
      this.leaveApplicationsWithDetails$,
      this.statusFilter,
      this.leaveTypeFilter,
      this.dateFilter
    ]).pipe(
      map(([applications, status, leaveType, date]) => {
        let filtered = [...applications];
        
        // Apply status filter
        if (status) {
          filtered = filtered.filter(app => app.status === status);
        }
        
        // Apply leave type filter
        if (leaveType) {
          filtered = filtered.filter(app => app.leave_type_id === leaveType);
        }
        
        // Apply date filter
        if (date) {
          const filterDate = new Date(date);
          filtered = filtered.filter(app => {
            const startDate = new Date(app.start_date);
            return startDate >= filterDate;
          });
        }

        // Update total items for pagination
        this.totalItems = filtered.length;
        
        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return filtered.slice(startIndex, startIndex + this.itemsPerPage);
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

  // Handle filter changes
  onStatusFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilter.next(value);
    this.currentPage = 1; // Reset to first page on filter change
  }

  onLeaveTypeFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.leaveTypeFilter.next(value);
    this.currentPage = 1;
  }

  onDateFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dateFilter.next(value);
    this.currentPage = 1;
  }

  // Handle pagination
  onPageChange(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  // Handle view action
  showViewModal(application: any): void {
    this.selectedApplication = application;
    this.isViewModalOpen = true;
  }

  // Handle approve action
  showApproveConfirmation(application: any): void {
    this.selectedApplication = application;
    this.confirmAction = 'approve';
    this.isConfirmModalOpen = true;
  }

  // Handle reject action
  showRejectConfirmation(application: any): void {
    this.selectedApplication = application;
    this.confirmAction = 'reject';
    this.isConfirmModalOpen = true;
  }

  // Handle modal close
  closeViewModal(): void {
    this.isViewModalOpen = false;
    this.selectedApplication = null;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.selectedApplication = null;
    this.isProcessing = false;
  }

  // Handle approve action
  async approveLeave(): Promise<void> {
    if (!this.selectedApplication) return;

    try {
      this.isProcessing = true;
      
      // Get current applications
      const applications = await this.dummyDataService.getLeaveApplications().toPromise();
      if (!applications) throw new Error('Failed to fetch applications');
      
      // Find and update the application
      const application = applications.find(app => app.id === this.selectedApplication.id);
      if (!application) throw new Error('Application not found');
      
      // Update the application status
      application.status = 'Approved';
      
      // Update the selected application status as well
      this.selectedApplication.status = 'Approved';
      
      // In a real application, this would be an API call
      console.log('Approving leave application:', application);
      
      // Refresh the applications list
      this.leaveApplications$ = this.dummyDataService.getLeaveApplications();
      
      // Show success message and close modal
      alert(`Leave application has been approved successfully!`);
      this.closeConfirmModal();
    } catch (error) {
      console.error('Error approving leave application:', error);
      alert('Failed to approve leave application. Please try again.');
    } finally {
      this.isProcessing = false;
    }
  }

  // Handle reject action
  async rejectLeave(): Promise<void> {
    if (!this.selectedApplication) return;

    try {
      this.isProcessing = true;
      
      // Get current applications
      const applications = await this.dummyDataService.getLeaveApplications().toPromise();
      if (!applications) throw new Error('Failed to fetch applications');
      
      // Find and update the application
      const application = applications.find(app => app.id === this.selectedApplication.id);
      if (!application) throw new Error('Application not found');
      
      // Update the application status
      application.status = 'Rejected';
      
      // Update the selected application status as well
      this.selectedApplication.status = 'Rejected';
      
      // In a real application, this would be an API call
      console.log('Rejecting leave application:', application);
      
      // Refresh the applications list
      this.leaveApplications$ = this.dummyDataService.getLeaveApplications();
      
      // Show success message and close modal
      alert(`Leave application has been rejected.`);
      this.closeConfirmModal();
    } catch (error) {
      console.error('Error rejecting leave application:', error);
      alert('Failed to reject leave application. Please try again.');
    } finally {
      this.isProcessing = false;
    }
  }
}