// src\app\modules\recruitment\pages\job-listings\job-listings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss']
})
export class JobListingsComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  showCreateModal = false;
  showViewModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedJob: any = null;
  newJob = {
    position_title: '',
    department_id: '',
    job_description: '',
    qualifications: '',
    technical_competencies: '',
    salary_range: '',
    employment_type: 'Regular',
    num_vacancies: 1,
    application_deadline: new Date(),
    posting_status: 'Draft'
  };

  departments: any[] = [];

  // Filter properties
  filters = {
    status: '',
    department: '',
    type: '',
    search: ''
  };

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    this.loadJobs();
    this.loadDepartments();
  }

  loadJobs() {
    this.dummyDataService.getJobPostings().subscribe(jobs => {
      this.jobs = jobs;
      this.applyFilters();
    });
  }

  loadDepartments() {
    this.dummyDataService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.resetNewJob();
  }

  resetNewJob() {
    this.newJob = {
      position_title: '',
      department_id: '',
      job_description: '',
      qualifications: '',
      technical_competencies: '',
      salary_range: '',
      employment_type: 'Regular',
      num_vacancies: 1,
      application_deadline: new Date(),
      posting_status: 'Draft'
    };
  }

  createJob() {
    // In a real app, this would be an API call
    const job = {
      ...this.newJob,
      id: (this.jobs.length + 1).toString(),
      created_by: '1', // Dummy user ID
      created_at: new Date()
    };
    
    this.jobs = [...this.jobs, job];
    this.applyFilters(); // Apply filters to include the new job
    this.closeCreateModal();
  }

  // View functionality
  openViewModal(job: any) {
    this.selectedJob = job;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedJob = null;
  }

  // Edit functionality
  openEditModal(job: any) {
    this.selectedJob = { ...job };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedJob = null;
  }

  updateJob() {
    if (this.selectedJob) {
      // In a real app, this would be an API call
      const index = this.jobs.findIndex(job => job.id === this.selectedJob.id);
      if (index !== -1) {
        this.jobs[index] = { ...this.selectedJob };
        this.jobs = [...this.jobs]; // Trigger change detection
        this.applyFilters();
        this.closeEditModal();
      }
    }
  }

  // Delete functionality
  openDeleteModal(job: any) {
    this.selectedJob = job;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedJob = null;
  }

  deleteJob() {
    if (this.selectedJob) {
      // In a real app, this would be an API call
      this.jobs = this.jobs.filter(job => job.id !== this.selectedJob.id);
      this.applyFilters();
      this.closeDeleteModal();
    }
  }

  // Filter methods
  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesStatus = !this.filters.status || job.posting_status === this.filters.status;
      const matchesDepartment = !this.filters.department || job.department_id === this.filters.department;
      const matchesType = !this.filters.type || job.employment_type === this.filters.type;
      const matchesSearch = !this.filters.search || 
        job.position_title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        job.id.toLowerCase().includes(this.filters.search.toLowerCase());

      return matchesStatus && matchesDepartment && matchesType && matchesSearch;
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filters.search = input.value;
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      status: '',
      department: '',
      type: '',
      search: ''
    };
    this.applyFilters();
  }

  // Helper method to get department name
  getDepartmentName(departmentId: string): string {
    const department = this.departments.find(dept => dept.id === departmentId);
    return department ? department.department_name : departmentId;
  }
}