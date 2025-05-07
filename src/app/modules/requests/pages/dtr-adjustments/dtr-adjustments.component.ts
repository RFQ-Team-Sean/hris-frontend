import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

interface DtrAdjustmentRequest {
  id: string;
  personnel_id: string;
  log_date: string;
  original_time_in: string;
  original_time_out: string;
  requested_time_in: string;
  requested_time_out: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | '';
  request_date: string;
}

interface DtrAdjustment {
  id: number;
  personnel_id: number;
  log_date: Date;
  original_time_in: Date;
  original_time_out: Date;
  requested_time_in: Date;
  requested_time_out: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | '';
  request_date: Date;
}

@Component({
  selector: 'app-dtr-adjustments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dtr-adjustments.component.html',
  styleUrls: ['./dtr-adjustments.component.scss']
})
export class DtrAdjustmentsComponent implements OnInit {
  adjustments: DtrAdjustment[] = [];
  paginatedData: DtrAdjustment[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  selectedStatus: 'Pending' | 'Approved' | 'Rejected' | '' = '';
  selectedDate: string = '';
  personnel: any[] = [];
  departments: any[] = [];
  showViewModal = false;
  selectedAdjustment: DtrAdjustment | null = null;
  Math = Math;

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit(): void {
    this.loadPersonnelData();
    this.loadAdjustments();
  }

  loadPersonnelData(): void {
    this.dummyDataService.getPersonnel().subscribe(data => {
      this.personnel = data;
    });
    this.dummyDataService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  getEmployeeName(personnelId: number): string {
    const employee = this.personnel.find(p => p.id === personnelId.toString());
    if (!employee) return 'Unknown Employee';
    return `${employee.first_name} ${employee.last_name}`;
  }

  getEmployeeDepartment(personnelId: number): string {
    const employee = this.personnel.find(p => p.id === personnelId.toString());
    if (!employee || !employee.department_id) return 'No Department';
    const department = this.departments.find(d => d.id === employee.department_id);
    return department ? department.department_name : 'No Department';
  }

  loadAdjustments(): void {
    this.dummyDataService.getDtrAdjustmentRequests().subscribe(rawAdjustments => {
      this.adjustments = rawAdjustments.map(adj => ({
        ...adj,
        id: Number(adj.id),
        personnel_id: Number(adj.personnel_id),
        log_date: new Date(adj.log_date),
        original_time_in: new Date(adj.original_time_in),
        original_time_out: new Date(adj.original_time_out),
        requested_time_in: new Date(adj.requested_time_in),
        requested_time_out: new Date(adj.requested_time_out),
        request_date: new Date(adj.request_date),
        status: adj.status as 'Pending' | 'Approved' | 'Rejected' | ''
      }));
      this.updatePaginatedData();
    });
  }

  updatePaginatedData(): void {
    let filteredData = this.adjustments;

    if (this.selectedStatus) {
      filteredData = filteredData.filter(adj => adj.status === this.selectedStatus);
    }

    if (this.selectedDate) {
      const selectedDateStr = new Date(this.selectedDate).toISOString().split('T')[0];
      filteredData = filteredData.filter(adj => 
        adj.log_date.toISOString().split('T')[0] === selectedDateStr
      );
    }

    this.totalItems = filteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = filteredData.slice(startIndex, startIndex + this.pageSize);
  }

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
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  formatTime(time: string | Date): string {
    if (!time) return '--:--';
    const date = new Date(time);
    if (isNaN(date.getTime())) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(date: string | Date): string {
    if (!date) return '--/--/----';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '--/--/----';
    return d.toLocaleDateString();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  approveRequest(id: number): void {
    const adjustment = this.adjustments.find(adj => adj.id === id);
    if (adjustment) {
      adjustment.status = 'Approved';
      this.updatePaginatedData();
    }
  }

  rejectRequest(id: number): void {
    const adjustment = this.adjustments.find(adj => adj.id === id);
    if (adjustment) {
      adjustment.status = 'Rejected';
      this.updatePaginatedData();
    }
  }

  viewRequest(id: number): void {
    const adjustment = this.adjustments.find(adj => adj.id === id);
    if (adjustment) {
      this.selectedAdjustment = adjustment;
      this.showViewModal = true;
    }
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedAdjustment = null;
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  onDateChange(): void {
    this.currentPage = 1;
    this.updatePaginatedData();
  }
} 