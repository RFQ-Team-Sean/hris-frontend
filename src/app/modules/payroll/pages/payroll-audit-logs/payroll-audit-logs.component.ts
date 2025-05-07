import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface AuditLog {
  id: number;
  timestamp: string;
  action: string;
  employee: {
    name: string;
    id: string;
  };
  details: string;
  performedBy: {
    name: string;
    role: string;
  };
  ipAddress: string;
}

@Component({
  selector: 'app-payroll-audit-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DummyDataService],
  templateUrl: './payroll-audit-logs.component.html',
  styleUrls: ['./payroll-audit-logs.component.scss']
})
export class PayrollAuditLogsComponent implements OnInit {
  // Filter states
  selectedDateRange = 'Last 7 days';
  selectedActionType = 'All Actions';
  selectedPerformedBy = 'All Users';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  // View modal
  showViewModal = false;
  selectedLog: AuditLog | null = null;

  // Filter subjects
  private dateRangeSubject = new BehaviorSubject<string>('Last 7 days');
  private actionTypeSubject = new BehaviorSubject<string>('All Actions');
  private performedBySubject = new BehaviorSubject<string>('All Users');

  // Combined filtered logs
  filteredLogs$: Observable<AuditLog[]>;

  // Math property for template
  Math = Math;

  constructor(@Inject(DummyDataService) private dummyDataService: DummyDataService) {
    // Combine all filter observables
    this.filteredLogs$ = combineLatest([
      this.dateRangeSubject,
      this.actionTypeSubject,
      this.performedBySubject
    ]).pipe(
      switchMap(([dateRange, actionType, performedBy]) => {
        return this.dummyDataService.getAuditLogs().pipe(
          map(logs => {
            let filteredLogs = [...logs];
            
            // Apply date range filter
            if (dateRange !== 'All Time') {
              const now = new Date();
              const days = dateRange === 'Last 7 days' ? 7 : 
                          dateRange === 'Last 30 days' ? 30 : 
                          dateRange === 'Last 90 days' ? 90 : 0;
              
              if (days > 0) {
                const cutoffDate = new Date(now.setDate(now.getDate() - days));
                filteredLogs = filteredLogs.filter((log: AuditLog) => new Date(log.timestamp) >= cutoffDate);
              }
            }

            // Apply action type filter
            if (actionType !== 'All Actions') {
              filteredLogs = filteredLogs.filter((log: AuditLog) => log.action === actionType);
            }

            // Apply performed by filter
            if (performedBy !== 'All Users') {
              filteredLogs = filteredLogs.filter((log: AuditLog) => log.performedBy.role === performedBy);
            }

            // Update pagination info
            this.totalItems = filteredLogs.length;
            this.totalPages = Math.ceil(this.totalItems / this.pageSize);

            // Apply pagination
            const startIndex = (this.currentPage - 1) * this.pageSize;
            return filteredLogs.slice(startIndex, startIndex + this.pageSize);
          })
        );
      })
    );
  }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    // Initial load will be handled by the filteredLogs$ observable
  }

  onDateRangeChange(): void {
    this.dateRangeSubject.next(this.selectedDateRange);
    this.currentPage = 1;
  }

  onActionTypeChange(): void {
    this.actionTypeSubject.next(this.selectedActionType);
    this.currentPage = 1;
  }

  onPerformedByChange(): void {
    this.performedBySubject.next(this.selectedPerformedBy);
    this.currentPage = 1;
  }

  getBadgeColor(action: string): string {
    switch (action) {
      case 'Payslip Generated':
        return 'bg-blue-100 text-blue-800';
      case 'Salary Updated':
        return 'bg-green-100 text-green-800';
      case 'Deduction Added':
        return 'bg-red-100 text-red-800';
      case 'Bonus Added':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  viewDetails(log: AuditLog): void {
    this.selectedLog = log;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedLog = null;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLogs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLogs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLogs();
    }
  }

  exportLogs(): void {
    // TODO: Implement export functionality
    console.log('Export logs');
  }
}