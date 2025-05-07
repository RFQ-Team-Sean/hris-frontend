import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss']
})
export class AttendanceDashboardComponent implements OnInit {
  Math = Math;
  currentDate: string = new Date().toISOString().split('T')[0];
  selectedDepartment: string = '';
  selectedStatus: string = '';
  showViewModal = false;
  selectedRecord: any = null;
  
  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  
  // Observables for data
  attendanceLogs$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;

  // Combined data for template
  attendanceRecords$: Observable<any[]>;
  summaryStats$: Observable<any>;

  // Filter subjects
  private dateFilter$ = new BehaviorSubject<string>(this.currentDate);
  private departmentFilter$ = new BehaviorSubject<string>('');
  private statusFilter$ = new BehaviorSubject<string>('');

  constructor(private dummyDataService: DummyDataService) {
    this.attendanceLogs$ = this.dummyDataService.getAttendanceLogs();
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine data for the template
    this.attendanceRecords$ = combineLatest([
      this.attendanceLogs$,
      this.personnel$,
      this.departments$,
      this.dateFilter$,
      this.departmentFilter$,
      this.statusFilter$
    ]).pipe(
      map(([logs, personnel, departments, date, dept, status]) => {
        let filteredLogs = logs;

        // Apply date filter
        if (date) {
          const filterDate = new Date(date).toISOString().split('T')[0];
          filteredLogs = filteredLogs.filter(log => 
            new Date(log.log_date).toISOString().split('T')[0] === filterDate
          );
        }

        // Apply department filter
        if (dept) {
          filteredLogs = filteredLogs.filter(log => {
            const person = personnel.find(p => p.id === log.personnel_id);
            return person?.department_id === dept;
          });
        }

        // Apply status filter
        if (status) {
          filteredLogs = filteredLogs.filter(log => log.status === status);
        }

        // Update pagination
        this.totalItems = filteredLogs.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1);

        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.pageSize;
        filteredLogs = filteredLogs.slice(startIndex, startIndex + this.pageSize);

        return filteredLogs.map(log => {
          const person = personnel.find(p => p.id === log.personnel_id);
          const dept = departments.find(d => d.id === person?.department_id);
          
          return {
            id: log.id,
            name: person ? `${person.first_name} ${person.last_name}` : 'Unknown',
            employeeId: person?.id || 'Unknown',
            department: dept?.department_name || 'Unknown',
            timeIn: log.time_in ? this.formatTime(log.time_in) : '--:-- --',
            timeOut: log.time_out ? this.formatTime(log.time_out) : '--:-- --',
            hoursWorked: this.calculateHoursWorked(log.time_in, log.time_out),
            status: log.status,
            biometricUsed: log.biometric_used,
            logDate: log.log_date
          };
        });
      })
    );

    // Calculate summary statistics
    this.summaryStats$ = combineLatest([
      this.attendanceLogs$,
      this.personnel$,
      this.dateFilter$
    ]).pipe(
      map(([logs, personnel, date]) => {
        const totalEmployees = personnel.length;
        const filterDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const filteredLogs = logs.filter(log => 
          new Date(log.log_date).toISOString().split('T')[0] === filterDate
        );

        return {
          totalEmployees,
          presentToday: filteredLogs.filter(log => log.status === 'Present').length,
          lateArrivals: filteredLogs.filter(log => log.status === 'Late').length,
          absent: filteredLogs.filter(log => log.status === 'Absent').length,
          onLeave: filteredLogs.filter(log => log.status === 'On_Leave').length
        };
      })
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Format time
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Calculate hours worked
  calculateHoursWorked(timeIn: Date | null, timeOut: Date | null): string {
    if (!timeIn || !timeOut) return '0h 0m';
    
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Present':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Late':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Absent':
        return { background: '#fee2e2', text: '#991b1b' };
      case 'On_Leave':
        return { background: '#e0e7ff', text: '#4338ca' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Handle view action
  viewAttendance(record: any): void {
    this.selectedRecord = record;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedRecord = null;
  }

  // Filter handlers
  onDateChange(date: string): void {
    this.dateFilter$.next(date);
    this.currentPage = 1;
  }

  onDepartmentChange(department: string): void {
    this.departmentFilter$.next(department);
    this.currentPage = 1;
  }

  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
    this.currentPage = 1;
  }

  // Pagination handlers
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.dateFilter$.next(this.dateFilter$.value);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dateFilter$.next(this.dateFilter$.value);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dateFilter$.next(this.dateFilter$.value);
    }
  }
}