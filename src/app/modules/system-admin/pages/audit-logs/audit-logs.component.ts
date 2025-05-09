import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

interface AuditLog {
  id: number;
  timestamp: Date;
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
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.scss'
})
export class AuditLogsComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  filteredLogs: AuditLog[] = [];
  searchTerm: string = '';
  selectedAction: string = 'all';
  showFilterDropdown: boolean = false;
  dateRange: { start: Date | null; end: Date | null } = {
    start: null,
    end: null
  };

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    this.loadAuditLogs();
  }

  loadAuditLogs() {
    this.dummyDataService.getAuditLogs().subscribe(logs => {
      this.auditLogs = logs;
      this.filteredLogs = logs;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  setActionFilter(action: string) {
    this.selectedAction = action;
    this.applyFilters();
    this.showFilterDropdown = false;
  }

  applyFilters() {
    this.filteredLogs = this.auditLogs.filter(log => {
      const matchesSearch = 
        log.action.toLowerCase().includes(this.searchTerm) ||
        log.employee.name.toLowerCase().includes(this.searchTerm) ||
        log.details.toLowerCase().includes(this.searchTerm) ||
        log.performedBy.name.toLowerCase().includes(this.searchTerm);

      const matchesAction = this.selectedAction === 'all' || log.action === this.selectedAction;

      const matchesDateRange = this.dateRange.start && this.dateRange.end
        ? new Date(log.timestamp) >= this.dateRange.start && new Date(log.timestamp) <= this.dateRange.end
        : true;

      return matchesSearch && matchesAction && matchesDateRange;
    });
  }

  getUniqueActions(): string[] {
    return ['all', ...new Set(this.auditLogs.map(log => log.action))];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
