import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmploymentRecord {
  position: string;
  promotionDate?: string;
  startDate: string;
  endDate?: string;
}

interface Employee {
  id?: number;
  name?: string;
  dateHired?: string;
  status?: string;
  workSchedule?: {
    start: string;
    end: string;
  };
  assignedLocation?: string;
  currentPosition?: string;
  employmentHistory?: EmploymentRecord[];
  salaryHistory?: {
    currentGrade: string;
    compensationHistory: string;
  };
}

@Component({
  selector: 'app-employment-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employment-records.component.html',
  styleUrl: './employment-records.component.scss'
})
export class EmploymentRecordsComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Input() showEditButton: boolean = false;

  // Default employment history if none provided
  employmentHistory: EmploymentRecord[] = [
    {
      position: 'Software Developer',
      promotionDate: '2024-12-21',
      startDate: '2024-08-21',
      endDate: '2024-12-21'
    },
    {
      position: 'Junior Developer',
      startDate: '2024-08-21',
      endDate: '2024-12-21'
    }
  ];

  ngOnInit() {
    if (this.employee?.employmentHistory) {
      this.employmentHistory = this.employee.employmentHistory;
    }
  }

  editInformation() {
    console.log('Editing employment information');
    // Add edit logic here
  }
}
