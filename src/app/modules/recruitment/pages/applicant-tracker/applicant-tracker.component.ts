// src\app\modules\recruitment\pages\applicant-tracker\applicant-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

interface Applicant {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  dateApplied: string;
  currentStage: string;
  lastActivity: string;
  lastActivityDate: string;
  phone?: string;
  currentEmployer?: string;
  highestEducation?: string;
}

interface StageColor {
  bg: string;
  text: string;
}

@Component({
  selector: 'app-applicant-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './applicant-tracker.component.html',
  styleUrls: ['./applicant-tracker.component.scss']
})
export class ApplicantTrackerComponent implements OnInit {
  // Make Math available in the template
  protected Math = Math;
  
  applicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  
  // Filter states
  statusFilter: string = '';
  jobPositionFilter: string = '';
  dateFilter: string = '';
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  // Stage counts
  stageCounts = {
    new: 0,
    screen: 0,
    interview: 0,
    offer: 0,
    hired: 0
  };

  // Modals
  showAddModal = false;
  showViewModal = false;
  selectedApplicant: Applicant | null = null;

  // New Applicant Form
  applicantForm: FormGroup;
  availableJobs: any[] = [];

  // Stage progression
  private readonly stageProgression = {
    'New': 'Screen',
    'Screen': 'Interview',
    'Interview': 'Offer',
    'Offer': 'Hired',
    'Hired': 'Hired',
    'Rejected': 'Rejected'
  };

  constructor(
    private fb: FormBuilder,
    private dummyDataService: DummyDataService
  ) {
    this.applicantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required],
      currentEmployer: [''],
      highestEducation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadApplicants();
    this.loadAvailableJobs();
  }

  loadAvailableJobs() {
    // In a real app, this would be an API call
    this.availableJobs = [
      'Frontend Developer',
      'Backend Developer',
      'UX Designer',
      'Product Manager',
      'HR Specialist'
    ];
  }

  loadApplicants() {
    // In a real app, this would be an API call
    this.applicants = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        jobTitle: 'Frontend Developer',
        dateApplied: 'Jun 10, 2023',
        currentStage: 'Interview',
        lastActivity: 'Technical interview scheduled',
        lastActivityDate: 'Jun 14, 2023',
        phone: '09123456789',
        currentEmployer: 'Tech Corp',
        highestEducation: 'BS Computer Science'
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.c@email.com',
        jobTitle: 'UX Designer',
        dateApplied: 'Jun 5, 2023',
        currentStage: 'Screen',
        lastActivity: 'Resume reviewed',
        lastActivityDate: 'Jun 8, 2023',
        phone: '09234567890',
        currentEmployer: 'Design Studio',
        highestEducation: 'BA Design'
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        jobTitle: 'Product Manager',
        dateApplied: 'May 28, 2023',
        currentStage: 'Offer',
        lastActivity: 'Offer letter sent',
        lastActivityDate: 'Jun 12, 2023',
        phone: '09345678901',
        currentEmployer: 'Product Co',
        highestEducation: 'MBA'
      }
    ];
    
    this.applyFilters();
    this.updateStageCounts();
  }

  applyFilters() {
    this.filteredApplicants = this.applicants.filter(applicant => {
      const matchesStatus = !this.statusFilter || applicant.currentStage === this.statusFilter;
      const matchesJob = !this.jobPositionFilter || applicant.jobTitle === this.jobPositionFilter;
      const matchesSearch = !this.searchQuery || 
        applicant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        applicant.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesStatus && matchesJob && matchesSearch;
    });
    
    this.totalItems = this.filteredApplicants.length;
    this.updateStageCounts();
  }

  updateStageCounts() {
    this.stageCounts = {
      new: this.applicants.filter(a => a.currentStage === 'New').length,
      screen: this.applicants.filter(a => a.currentStage === 'Screen').length,
      interview: this.applicants.filter(a => a.currentStage === 'Interview').length,
      offer: this.applicants.filter(a => a.currentStage === 'Offer').length,
      hired: this.applicants.filter(a => a.currentStage === 'Hired').length
    };
  }

  onStatusFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.statusFilter = select.value;
    this.applyFilters();
  }

  onJobPositionFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.jobPositionFilter = select.value;
    this.applyFilters();
  }

  onDateFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.dateFilter = select.value;
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  getStageColor(stage: string): StageColor {
    switch (stage) {
      case 'New':
        return { bg: '#e5e7eb', text: '#374151' };
      case 'Screen':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'Interview':
        return { bg: '#dbeafe', text: '#1e40af' };
      case 'Offer':
        return { bg: '#d1fae5', text: '#065f46' };
      case 'Hired':
        return { bg: '#dcfce7', text: '#166534' };
      case 'Rejected':
        return { bg: '#fee2e2', text: '#991b1b' };
      default:
        return { bg: '#e5e7eb', text: '#374151' };
    }
  }

  viewApplicant(applicant: Applicant) {
    this.selectedApplicant = applicant;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedApplicant = null;
  }

  advanceApplicant(applicant: Applicant) {
    const nextStage = this.stageProgression[applicant.currentStage as keyof typeof this.stageProgression];
    if (nextStage && nextStage !== applicant.currentStage) {
      applicant.currentStage = nextStage;
      applicant.lastActivity = `Advanced to ${nextStage} stage`;
      applicant.lastActivityDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      this.applyFilters();
    }
  }

  rejectApplicant(applicant: Applicant) {
    applicant.currentStage = 'Rejected';
    applicant.lastActivity = 'Application rejected';
    applicant.lastActivityDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.applyFilters();
  }

  hireApplicant(applicant: Applicant) {
    applicant.currentStage = 'Hired';
    applicant.lastActivity = 'Applicant hired';
    applicant.lastActivityDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.applyFilters();
  }

  withdrawOffer(applicant: Applicant) {
    applicant.currentStage = 'Interview';
    applicant.lastActivity = 'Offer withdrawn';
    applicant.lastActivityDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.applyFilters();
  }

  addNewApplicant() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.applicantForm.reset();
  }

  onSubmitNewApplicant() {
    if (this.applicantForm.valid) {
      const formValue = this.applicantForm.value;
      const newApplicant: Applicant = {
        id: this.applicants.length + 1,
        name: `${formValue.firstName} ${formValue.lastName}`,
        email: formValue.email,
        jobTitle: formValue.jobTitle,
        dateApplied: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        currentStage: 'New',
        lastActivity: 'Application submitted',
        lastActivityDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        phone: formValue.phone,
        currentEmployer: formValue.currentEmployer,
        highestEducation: formValue.highestEducation
      };

      // Add to applicants array
      this.applicants.unshift(newApplicant);
      
      // Update filters and counts
      this.applyFilters();
      this.updateStageCounts();
      
      // Close modal and reset form
      this.closeAddModal();
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedApplicants() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredApplicants.slice(start, end);
  }
}