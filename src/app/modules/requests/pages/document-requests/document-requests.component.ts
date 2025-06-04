import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { forkJoin } from 'rxjs';

interface DocumentRequest {
  id: string;
  personnel_id: string;
  certificate_type: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  request_date: Date;
  employeeName?: string;
  department?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

type FilterOption = 'all' | 'status' | 'documentType' | 'priority';

@Component({
  selector: 'app-document-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './document-requests.component.html',
  styleUrl: './document-requests.component.scss'
})
export class DocumentRequestsComponent implements OnInit {
  // Reference to Math for template usage
  Math = Math;

  // Statistics
  requestStats = {
    totalRequests: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  };

  // All requests (unfiltered)
  allRequests: DocumentRequest[] = [];

  // Displayed requests (filtered)
  requests: DocumentRequest[] = [];

  // Search and Filter
  searchTerm: string = '';
  currentFilter: FilterOption = 'all';
  showFilterDropdown: boolean = false;

  // Filter options
  documentTypes: string[] = ['Employment', 'Service Record', 'Clearance', 'Salary Certificate', 'Other'];
  statuses: string[] = ['Pending', 'Approved', 'Rejected'];
  priorities: string[] = ['High', 'Medium', 'Low'];

  // Selected filter values
  selectedStatus: string = '';
  selectedDocumentType: string = '';
  selectedPriority: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Modal state
  showRequestDetails = false;
  selectedRequest: DocumentRequest | null = null;

  constructor(private dummyDataService: DummyDataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Use forkJoin to get all required data at once
    forkJoin({
      certificateRequests: this.dummyDataService.getCertificateRequests(),
      personnel: this.dummyDataService.getPersonnel(),
      departments: this.dummyDataService.getDepartments()
    }).subscribe(data => {
      // Map the data to our DocumentRequest interface
      this.allRequests = data.certificateRequests.map(request => {
        const personnel = data.personnel.find(p => p.id === request.personnel_id);
        const department = data.departments.find(d => d.id === personnel?.department_id);

        // Assign priority based on certificate type
        let priority: 'High' | 'Medium' | 'Low';
        switch (request.certificate_type) {
          case 'Employment':
            priority = 'High';
            break;
          case 'Service Record':
            priority = 'Medium';
            break;
          default:
            priority = 'Low';
        }

        return {
          ...request,
          employeeName: personnel ? `${personnel.first_name} ${personnel.last_name}` : 'Unknown',
          department: department?.department_name || 'Unknown',
          priority: priority
        };
      });

      // Update requests list
      this.requests = [...this.allRequests];

      // Update stats
      this.updateStats();

      // Update total items for pagination
      this.totalItems = this.allRequests.length;
    });
  }

  private updateStats(): void {
    this.requestStats.totalRequests = this.allRequests.length;
    this.requestStats.pending = this.allRequests.filter(req => req.status === 'Pending').length;
    this.requestStats.approved = this.allRequests.filter(req => req.status === 'Approved').length;
    this.requestStats.rejected = this.allRequests.filter(req => req.status === 'Rejected').length;
  }

  // Search functionality
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  // Toggle filter dropdown
  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  // Set filter type
  setFilterType(filterType: FilterOption): void {
    this.currentFilter = filterType;
    this.selectedStatus = '';
    this.selectedDocumentType = '';
    this.selectedPriority = '';
    this.applyFilters();
  }

  // Apply filters
  applyFilters(): void {
    let filteredRequests = [...this.allRequests];

    // Apply search filter
    if (this.searchTerm) {
      filteredRequests = filteredRequests.filter(req =>
        req.employeeName?.toLowerCase().includes(this.searchTerm) ||
        req.certificate_type.toLowerCase().includes(this.searchTerm) ||
        req.department?.toLowerCase().includes(this.searchTerm)
      );
    }

    // Apply other filters
    if (this.currentFilter === 'status' && this.selectedStatus) {
      filteredRequests = filteredRequests.filter(req => req.status === this.selectedStatus);
    } else if (this.currentFilter === 'documentType' && this.selectedDocumentType) {
      filteredRequests = filteredRequests.filter(req => req.certificate_type === this.selectedDocumentType);
    } else if (this.currentFilter === 'priority' && this.selectedPriority) {
      filteredRequests = filteredRequests.filter(req => req.priority === this.selectedPriority);
    }

    this.requests = filteredRequests;
  }

  // Get active filter label
  getActiveFilterLabel(): string {
    if (this.currentFilter === 'status' && this.selectedStatus) {
      return `Status: ${this.selectedStatus}`;
    } else if (this.currentFilter === 'documentType' && this.selectedDocumentType) {
      return `Type: ${this.selectedDocumentType}`;
    } else if (this.currentFilter === 'priority' && this.selectedPriority) {
      return `Priority: ${this.selectedPriority}`;
    }
    return 'Filter';
  }

  // Get color class based on status
  getStatusColorClass(status: string): string {
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

  // Get color class based on priority
  getPriorityColorClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Open request details modal
  openRequestDetails(request: DocumentRequest): void {
    this.selectedRequest = { ...request };
    this.showRequestDetails = true;
  }

  // Close request details modal
  closeRequestDetails(): void {
    this.showRequestDetails = false;
    this.selectedRequest = null;
  }
}
