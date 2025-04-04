import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmploymentRecordsComponent } from '../employment-records/employment-records.component';
import { MembershipDataComponent } from '../membership-data/membership-data.component';
import { MeritsAndViolationsComponent } from '../merits-and-violations/merits-and-violations.component';
import { trigger, transition, style, animate } from '@angular/animations';

interface EmploymentRecord {
  position: string;
  promotionDate?: string;
  startDate: string;
  endDate?: string;
}

interface EmployeeDocument {
  name: string;
  fileName: string;
  fileSize: string;
}

interface Employee {
  id?: number;
  name?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  position?: string;
  department?: string;
  employmentType?: string;
  dateOfBirth?: string;
  gender?: string;
  civilStatus?: string;
  address?: string;
  dateHired?: string;
  salary?: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  status?: string;
  workSchedule?: {
    start: string;
    end: string;
  };
  assignedLocation?: string;
  employmentHistory?: EmploymentRecord[];
  salaryHistory?: {
    currentGrade: string;
    compensationHistory: string;
  };
}

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule, EmploymentRecordsComponent, MembershipDataComponent, MeritsAndViolationsComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() employee: Employee | null = null;

  isDropdownOpen: boolean = false;
  sections: string[] = [
    'Employee Details',
    'Employment Records',
    'Membership Data',
    'Merits & Violations'
  ];
  selectedSection: string = 'Employee Details';

  documents: EmployeeDocument[] = [
    {
      name: 'Resume',
      fileName: 'resume_2024.pdf',
      fileSize: '2.5 MB'
    },
    {
      name: 'Portfolio',
      fileName: 'portfolio_2024.pdf',
      fileSize: '5.8 MB'
    }
  ];

  employeeStatus: string = 'Active';

  ngOnInit() {
    if (this.employee?.status) {
      this.employeeStatus = this.employee.status;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectSection(section: string) {
    this.selectedSection = section;
    this.isDropdownOpen = false;
  }

  closeModal() {
    this.isOpen = false;
  }

  onFileUpload(event: any, documentType: string) {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading ${documentType}:`, file.name);
      // Add file upload logic here
    }
  }

  downloadDocument(document: EmployeeDocument) {
    console.log('Downloading:', document.fileName);
    // Add download logic here
  }

  viewDocument(document: EmployeeDocument) {
    console.log('Viewing:', document.fileName);
    // Add view logic here
  }

  editInformation() {
    console.log('Editing employee information');
    // Add edit logic here
  }

  removeDocument(document: EmployeeDocument) {
    console.log('Removing:', document.fileName);
    // Add document removal logic here
  }
}
