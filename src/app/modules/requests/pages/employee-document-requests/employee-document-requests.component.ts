import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-employee-document-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-document-requests.component.html',
  styleUrl: './employee-document-requests.component.scss'
})
export class EmployeeDocumentRequestsComponent implements OnInit {
  // Reference to Math for template usage
  Math = Math;

  // Form for new request
  requestForm: FormGroup;

  // All requests (unfiltered)
  allRequests: DocumentRequest[] = [];

  // Displayed requests (filtered)
  requests: DocumentRequest[] = [];

  // Search term
  searchTerm: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Modal state
  showRequestDetails = false;
  selectedRequest: DocumentRequest | null = null;
  showNewRequestModal = false;

  // Document types
  documentTypes: string[] = ['Employment', 'Service Record', 'Clearance', 'Salary Certificate', 'Other'];

  constructor(
    private dummyDataService: DummyDataService,
    private fb: FormBuilder
  ) {
    this.requestForm = this.fb.group({
      certificate_type: ['', Validators.required],
      purpose: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

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
      // For demo purposes, we'll use personnel_id '1' as the current user
      const currentUserId = '1';

      // Map the data to our DocumentRequest interface
      this.allRequests = data.certificateRequests
        .filter(request => request.personnel_id === currentUserId)
        .map(request => {
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

      // Update total items for pagination
      this.totalItems = this.allRequests.length;
    });
  }

  // Search functionality
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  // Apply filters
  applyFilters(): void {
    let filteredRequests = [...this.allRequests];

    // Apply search filter
    if (this.searchTerm) {
      filteredRequests = filteredRequests.filter(req =>
        req.certificate_type.toLowerCase().includes(this.searchTerm) ||
        req.purpose.toLowerCase().includes(this.searchTerm)
      );
    }

    this.requests = filteredRequests;
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

  // Open new request modal
  openNewRequestModal(): void {
    this.showNewRequestModal = true;
    this.requestForm.reset();
  }

  // Close new request modal
  closeNewRequestModal(): void {
    this.showNewRequestModal = false;
  }

  // Submit new request
  submitRequest(): void {
    if (this.requestForm.valid) {
      // In a real application, this would make an API call
      const newRequest: DocumentRequest = {
        id: (this.allRequests.length + 1).toString(),
        personnel_id: '1', // Current user ID
        certificate_type: this.requestForm.get('certificate_type')?.value,
        purpose: this.requestForm.get('purpose')?.value,
        status: 'Pending',
        request_date: new Date(),
        priority: 'Medium'
      };

      // Add to requests list
      this.allRequests.unshift(newRequest);
      this.requests = [...this.allRequests];
      this.totalItems = this.allRequests.length;

      // Close modal and reset form
      this.closeNewRequestModal();
    }
  }
} 