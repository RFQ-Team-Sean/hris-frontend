import { Component, Input, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmploymentRecordsComponent } from '../employment-records/employment-records.component';
import { MembershipDataComponent } from '../membership-data/membership-data.component';
import { MeritsAndViolationsComponent } from '../merits-and-violations/merits-and-violations.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { forkJoin } from 'rxjs';

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
  id: number;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix?: string;
  date_of_birth?: string;
  gender: string;
  civil_status: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  department: string;
  employment_type?: string;
  date_hired?: string;
  salary?: number;
  status: string;
  gsis_number?: string;
  pagibig_number?: string;
  philhealth_number?: string;
  sss_number?: string;
  tin_number?: string;
  avatar?: string;
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
  @Input() employee: Employee | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() editInformation = new EventEmitter<Employee>();

  isDropdownOpen: boolean = false;
  selectedSection: string = 'Employee Details';
  sections: string[] = [
    'Employee Details',
    'Employment Records',
    'Membership Data',
    'Merits & Violations'
  ];

  // Edit form data
  editingEmployee: Employee | null = null;
  isEditing: boolean = false;

  // Dropdown options
  roles: string[] = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  designations: string[] = [];
  departments: string[] = [];
  employmentTypes: string[] = ['Regular', 'Contractual', 'Probationary', 'Part-time'];
  statuses: string[] = ['Active', 'Inactive'];

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

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    if (this.employee) {
      this.loadEmployeeData();
      this.loadDesignations();
      this.loadDepartments();
    }
  }

  loadDesignations() {
    this.dummyDataService.getPersonnel().subscribe(personnel => {
      // Extract unique designations from personnel data
      this.designations = [...new Set(personnel.map(p => p.designation))];
    });
  }

  loadDepartments() {
    this.dummyDataService.getDepartments().subscribe(departments => {
      this.departments = departments.map(dept => dept.department_name);
    });
  }

  loadEmployeeData() {
    if (!this.employee) return;

    forkJoin({
      personnel: this.dummyDataService.getPersonnel(),
      users: this.dummyDataService.getUsers(),
      departments: this.dummyDataService.getDepartments()
    }).subscribe(data => {
      const personnel = data.personnel.find(p => p.personnel_id === this.employee?.id);
      const user = data.users.find(u => u.user_id === personnel?.user_id);
      const department = data.departments.find(d => d.department_id === personnel?.department_id);

      if (personnel && user) {
        this.employee = {
          id: personnel.personnel_id,
          name: `${personnel.first_name} ${personnel.last_name}`,
          first_name: personnel.first_name,
          middle_name: personnel.middle_name || '',
          last_name: personnel.last_name,
          gender: personnel.gender,
          civil_status: personnel.civil_status,
          email: user.email,
          phone: personnel.contact_number || '',
          address: personnel.address || '',
          position: personnel.designation,
          department: department?.department_name || '',
          status: user.status,
          employment_type: user.employment_type,
          date_hired: user.date_hired || '',
          salary: user.salary || 0,
          gsis_number: personnel.gsis_number || '',
          pagibig_number: personnel.pagibig_number || '',
          philhealth_number: personnel.philhealth_number || '',
          sss_number: personnel.sss_number || '',
          tin_number: personnel.tin_number || ''
        };
      }
    });
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

  onClose() {
    this.closeModal.emit();
  }

  onEdit() {
    if (this.employee) {
      this.isEditing = true;
      this.editingEmployee = { ...this.employee };
    }
  }

  submitEdit() {
    if (this.editingEmployee) {
      // Update the dummy data
      this.dummyDataService.getPersonnel().subscribe(personnel => {
        const updatedPersonnel = personnel.map(person => {
          if (person.personnel_id === this.editingEmployee?.id) {
            return {
              ...person,
              first_name: this.editingEmployee?.first_name || '',
              middle_name: this.editingEmployee?.middle_name || '',
              last_name: this.editingEmployee?.last_name || '',
              gender: this.editingEmployee?.gender || '',
              civil_status: this.editingEmployee?.civil_status || '',
              designation: this.editingEmployee?.position || '',
              department_id: this.departments.indexOf(this.editingEmployee?.department || '') + 1
            };
          }
          return person;
        });

        // Update the local employee data
        if (this.employee && this.editingEmployee) {
          this.employee = {
            ...this.editingEmployee,
            id: this.editingEmployee.id,
            name: `${this.editingEmployee.first_name} ${this.editingEmployee.last_name}`
          };
        }

        // Emit the updated employee data
        if (this.editingEmployee) {
          this.editInformation.emit(this.editingEmployee);
        }
        
        // Reset editing state
        this.isEditing = false;
        this.editingEmployee = null;

        alert('Employee information updated successfully!');
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingEmployee = null;
  }

  onInputChange(event: Event, property: keyof Employee) {
    if (this.isEditing && this.editingEmployee) {
      const target = event.target as HTMLInputElement;
      if (target) {
        (this.editingEmployee[property] as any) = target.value;
      }
    }
  }

  onSelectChange(event: Event, property: keyof Employee) {
    if (this.isEditing && this.editingEmployee) {
      const target = event.target as HTMLSelectElement;
      if (target) {
        (this.editingEmployee[property] as any) = target.value;
      }
    }
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

  removeDocument(document: EmployeeDocument) {
    console.log('Removing:', document.fileName);
    // Add document removal logic here
  }
}
