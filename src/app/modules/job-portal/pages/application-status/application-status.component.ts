import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define enum to match database schema
enum ApplicationStatus {
  Pending = 'Pending',
  Pre_Screening = 'Pre_Screening',
  For_Interview = 'For_Interview',
  For_Examination = 'For_Examination',
  Shortlisted = 'Shortlisted',
  Selected = 'Selected',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  Hired = 'Hired'
}

interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentEmployer?: string;
  highestEducation?: string;
  resumePath?: string;
  isExistingEmployee: boolean;
}

interface JobApplication {
  id: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusText: string;
  applicant: Applicant;
  coverLetter?: string;
  applicationNotes?: string;
  interviewDate?: string;
  examDate?: string;
}

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.scss'
})
export class ApplicationStatusComponent implements OnInit {
  applications: JobApplication[] = [];
  filteredApplications: JobApplication[] = [];
  statusFilter: string = '';
  timeFilter: string = '';
  searchQuery: string = '';
  selectedApplication: JobApplication | null = null;
  showDetailsModal: boolean = false;
  applicationStatus = ApplicationStatus; // Expose enum to template
  adminNotes: string = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Mock data - in a real application, this would come from a service
    this.applications = [
      {
        id: 1,
        jobTitle: 'Senior Frontend Developer',
        company: 'Acme Corporation',
        appliedDate: '2023-09-15',
        status: ApplicationStatus.For_Interview,
        statusText: 'For Interview',
        applicant: {
          id: 101,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          currentEmployer: 'TechCorp Inc.',
          highestEducation: 'Bachelor of Science, Computer Science',
          resumePath: 'assets/resumes/john_smith_resume.pdf',
          isExistingEmployee: false
        },
        coverLetter: 'I am excited to apply for the Senior Frontend Developer position at Acme Corporation. With my 5+ years of experience in Angular and React development...',
        applicationNotes: 'Strong candidate with good technical background. Schedule technical interview.',
        interviewDate: '2023-09-22'
      },
      {
        id: 2,
        jobTitle: 'UX Designer',
        company: 'TechStart Inc.',
        appliedDate: '2023-09-10',
        status: ApplicationStatus.Pre_Screening,
        statusText: 'Pre-Screening',
        applicant: {
          id: 102,
          firstName: 'Emily',
          lastName: 'Johnson',
          email: 'emily.johnson@example.com',
          phone: '(555) 234-5678',
          currentEmployer: 'Design Solutions',
          highestEducation: 'Master of Fine Arts, Digital Design',
          resumePath: 'assets/resumes/emily_johnson_resume.pdf',
          isExistingEmployee: false
        },
        coverLetter: 'As a UX Designer with 3 years of experience creating user-centered designs, I am thrilled about the opportunity to join TechStart Inc...'
      },
      {
        id: 3,
        jobTitle: 'Full Stack Developer',
        company: 'Global Solutions',
        appliedDate: '2023-09-05',
        status: ApplicationStatus.Selected,
        statusText: 'Selected',
        applicant: {
          id: 103,
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.brown@example.com',
          phone: '(555) 345-6789',
          currentEmployer: 'WebDev LLC',
          highestEducation: 'Bachelor of Engineering, Software',
          resumePath: 'assets/resumes/michael_brown_resume.pdf',
          isExistingEmployee: false
        },
        applicationNotes: 'Excellent technical skills. All interviews passed successfully. Sending offer letter.',
      },
      {
        id: 4,
        jobTitle: 'Project Manager',
        company: 'Innovate Corp',
        appliedDate: '2023-08-28',
        status: ApplicationStatus.Rejected,
        statusText: 'Rejected',
        applicant: {
          id: 104,
          firstName: 'Sarah',
          lastName: 'Williams',
          email: 'sarah.williams@example.com',
          phone: '(555) 456-7890',
          currentEmployer: 'Project Masters',
          highestEducation: 'MBA, Project Management',
          resumePath: 'assets/resumes/sarah_williams_resume.pdf',
          isExistingEmployee: false
        },
        applicationNotes: 'Not enough experience in the required industry. Consider for future openings.',
      },
      {
        id: 5,
        jobTitle: 'Data Analyst',
        company: 'Data Insights LLC',
        appliedDate: '2023-08-20',
        status: ApplicationStatus.For_Examination,
        statusText: 'For Examination',
        applicant: {
          id: 105,
          firstName: 'David',
          lastName: 'Miller',
          email: 'david.miller@example.com',
          phone: '(555) 567-8901',
          currentEmployer: 'Data Solutions Inc.',
          highestEducation: 'Master of Science, Data Science',
          resumePath: 'assets/resumes/david_miller_resume.pdf',
          isExistingEmployee: false
        },
        examDate: '2023-09-25',
        applicationNotes: 'Promising candidate. Schedule technical assessment.'
      },
      {
        id: 6,
        jobTitle: 'HR Specialist',
        company: 'Workforce Solutions',
        appliedDate: '2023-09-02',
        status: ApplicationStatus.Pending,
        statusText: 'Pending',
        applicant: {
          id: 106,
          firstName: 'Jennifer',
          lastName: 'Garcia',
          email: 'jennifer.garcia@example.com',
          phone: '(555) 678-9012',
          currentEmployer: 'HR Consultants',
          highestEducation: 'Bachelor of Arts, Human Resources',
          resumePath: 'assets/resumes/jennifer_garcia_resume.pdf',
          isExistingEmployee: false
        }
      },
      {
        id: 7,
        jobTitle: 'Marketing Manager',
        company: 'BrandBuild Inc.',
        appliedDate: '2023-09-01',
        status: ApplicationStatus.Hired,
        statusText: 'Hired',
        applicant: {
          id: 107,
          firstName: 'Robert',
          lastName: 'Martinez',
          email: 'robert.martinez@example.com',
          phone: '(555) 789-0123',
          currentEmployer: 'Marketing Solutions',
          highestEducation: 'MBA, Marketing',
          resumePath: 'assets/resumes/robert_martinez_resume.pdf',
          isExistingEmployee: true
        },
        applicationNotes: 'Internal transfer from Marketing department. All paperwork completed.',
      }
    ];
    
    this.filteredApplications = [...this.applications];
  }

  filterApplications(): void {
    this.filteredApplications = this.applications.filter(app => {
      const matchesStatus = this.statusFilter ? app.status === this.statusFilter : true;
      const matchesSearch = this.searchQuery 
        ? app.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
          app.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.applicant.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.applicant.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          app.applicant.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;
      
      // Time filter would need additional logic based on dates
      return matchesStatus && matchesSearch;
    });
  }

  // Helper method to get status display name
  getStatusDisplayName(status: ApplicationStatus): string {
    return status.replace('_', ' ');
  }

  viewDetails(application: JobApplication): void {
    this.selectedApplication = application;
    this.adminNotes = application.applicationNotes || '';
    this.showDetailsModal = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  closeModal(): void {
    this.showDetailsModal = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  updateStatus(application: JobApplication, newStatus: ApplicationStatus): void {
    // In a real application, this would call a service to update the database
    application.status = newStatus;
    application.statusText = this.getStatusDisplayName(newStatus);
    
    // Mock logic for different statuses
    if (newStatus === ApplicationStatus.For_Interview) {
      application.interviewDate = this.getFutureDate(7); // Schedule 7 days from now
    } else if (newStatus === ApplicationStatus.For_Examination) {
      application.examDate = this.getFutureDate(5); // Schedule 5 days from now
    }
    
    // Display success message or notification
    console.log(`Updated status for ${application.applicant.firstName} ${application.applicant.lastName} to ${application.statusText}`);
  }

  saveNotes(application: JobApplication): void {
    // In a real application, this would call a service to update the database
    application.applicationNotes = this.adminNotes;
    console.log('Notes saved successfully');
  }

  private getFutureDate(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  downloadResume(resumePath: string): void {
    // In a real application, this would trigger a file download
    console.log(`Downloading resume: ${resumePath}`);
    // window.open(resumePath, '_blank');
  }
}
