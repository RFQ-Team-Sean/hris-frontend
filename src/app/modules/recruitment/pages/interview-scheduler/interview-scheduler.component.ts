// src\app\modules\recruitment\pages\interview-scheduler\interview-scheduler.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Interview {
  id: string;
  applicantName: string;
  applicantId: string;
  jobTitle: string;
  stage: string;
  interviewer: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  applicantImage?: string;
}

@Component({
  selector: 'app-interview-scheduler',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './interview-scheduler.component.html',
  styleUrls: ['./interview-scheduler.component.scss']
})
export class InterviewSchedulerComponent implements OnInit {
  protected Math = Math;
  interviews: Interview[] = [];
  filteredInterviews: Interview[] = [];
  showScheduleModal = false;
  showViewModal = false;
  showFeedbackModal = false;
  selectedInterview: Interview | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalInterviews = 0;

  // Filter properties
  stageFilter = '';
  statusFilter = '';
  dateFilter = '';
  searchQuery = '';

  // Form properties
  scheduleForm: FormGroup;
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      applicantName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      stage: ['', Validators.required],
      interviewer: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.feedbackForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      notes: ['', Validators.required],
      recommendation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadInterviews();
  }

  loadInterviews() {
    // In a real application, this would be an API call
    this.interviews = [
      {
        id: 'INT-001',
        applicantName: 'Maria Garcia',
        applicantId: 'APP-2023-001',
        jobTitle: 'Senior Frontend Developer',
        stage: 'Technical Interview',
        interviewer: 'John Smith (Tech Lead)',
        date: 'Jun 15, 2023',
        time: '10:00 AM - 11:00 AM',
        status: 'Scheduled',
        applicantImage: 'assets/applicant1.jpg'
      },
      {
        id: 'INT-002',
        applicantName: 'James Wilson',
        applicantId: 'APP-2023-002',
        jobTitle: 'Product Designer',
        stage: 'HR Interview',
        interviewer: 'Sarah Johnson (HR Manager)',
        date: 'Jun 16, 2023',
        time: '2:00 PM - 3:00 PM',
        status: 'Rescheduled',
        applicantImage: 'assets/applicant2.jpg'
      },
      {
        id: 'INT-003',
        applicantName: 'Robert Chen',
        applicantId: 'APP-2023-003',
        jobTitle: 'Cybersecurity Specialist',
        stage: 'Final Interview',
        interviewer: 'Michael Brown (Director)',
        date: 'Jun 14, 2023',
        time: '9:30 AM - 10:30 AM',
        status: 'Completed',
        applicantImage: 'assets/applicant3.jpg'
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredInterviews = this.interviews.filter(interview => {
      const matchesStage = !this.stageFilter || interview.stage === this.stageFilter;
      const matchesStatus = !this.statusFilter || interview.status === this.statusFilter;
      const matchesSearch = !this.searchQuery || 
        interview.applicantName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        interview.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        interview.applicantId.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Date filter logic would be implemented here
      const matchesDate = !this.dateFilter || this.matchesDateFilter(interview.date);

      return matchesStage && matchesStatus && matchesSearch && matchesDate;
    });

    this.totalInterviews = this.filteredInterviews.length;
    this.updatePagination();
  }

  matchesDateFilter(date: string): boolean {
    if (!this.dateFilter) return true;
    
    const interviewDate = new Date(date);
    const today = new Date();
    
    switch (this.dateFilter) {
      case 'Today':
        return interviewDate.toDateString() === today.toDateString();
      case 'This Week':
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekEnd = new Date(today.setDate(today.getDate() + 6));
        return interviewDate >= weekStart && interviewDate <= weekEnd;
      case 'Next Week':
        const nextWeekStart = new Date(today.setDate(today.getDate() + 7 - today.getDay()));
        const nextWeekEnd = new Date(today.setDate(today.getDate() + 6));
        return interviewDate >= nextWeekStart && interviewDate <= nextWeekEnd;
      default:
        return true;
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredInterviews = this.filteredInterviews.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.onFilterChange();
  }

  openScheduleModal() {
    this.showScheduleModal = true;
    this.scheduleForm.reset();
  }

  closeScheduleModal() {
    this.showScheduleModal = false;
  }

  openViewModal(interview: Interview) {
    this.selectedInterview = interview;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedInterview = null;
  }

  openFeedbackModal(interview: Interview) {
    this.selectedInterview = interview;
    this.showFeedbackModal = true;
    this.feedbackForm.reset();
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
    this.selectedInterview = null;
  }

  onSubmitSchedule() {
    if (this.scheduleForm.valid) {
      const newInterview: Interview = {
        id: `INT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        applicantName: this.scheduleForm.value.applicantName,
        applicantId: `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        jobTitle: this.scheduleForm.value.jobTitle,
        stage: this.scheduleForm.value.stage,
        interviewer: this.scheduleForm.value.interviewer,
        date: this.scheduleForm.value.date,
        time: this.scheduleForm.value.time,
        status: 'Scheduled'
      };

      this.interviews.unshift(newInterview);
      this.closeScheduleModal();
      this.applyFilters();
    }
  }

  onSubmitFeedback() {
    if (this.feedbackForm.valid && this.selectedInterview) {
      // In a real application, this would update the interview with feedback
      const index = this.interviews.findIndex(i => i.id === this.selectedInterview?.id);
      if (index !== -1) {
        this.interviews[index].status = 'Completed';
      }
      this.closeFeedbackModal();
      this.applyFilters();
    }
  }

  rescheduleInterview(interview: Interview) {
    this.selectedInterview = interview;
    this.scheduleForm.patchValue({
      applicantName: interview.applicantName,
      jobTitle: interview.jobTitle,
      stage: interview.stage,
      interviewer: interview.interviewer,
      date: interview.date,
      time: interview.time
    });
    this.showScheduleModal = true;
  }

  cancelInterview(interview: Interview) {
    const index = this.interviews.findIndex(i => i.id === interview.id);
    if (index !== -1) {
      this.interviews[index].status = 'Cancelled';
      this.applyFilters();
    }
  }

  hireApplicant(interview: Interview) {
    // In a real application, this would trigger the hiring process
    const index = this.interviews.findIndex(i => i.id === interview.id);
    if (index !== -1) {
      this.interviews[index].status = 'Completed';
      this.applyFilters();
    }
  }
}