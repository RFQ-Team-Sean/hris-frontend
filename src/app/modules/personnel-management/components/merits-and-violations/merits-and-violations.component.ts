import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Merit {
  date: string;
  type: string;
  description: string;
  awardingBody: string;
  supportingDocument: string;
}

interface Violation {
  date: string;
  type: string;
  description: string;
  actionTaken: string;
  status: string;
  supportingDocument: string;
}

interface Employee {
  id?: number;
  name?: string;
  // Other employee properties
}

@Component({
  selector: 'app-merits-and-violations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merits-and-violations.component.html',
  styleUrl: './merits-and-violations.component.scss'
})
export class MeritsAndViolationsComponent {
  @Input() employeeName: string = 'Ysa Bianca A. De La Rama';
  @Input() employee?: Employee | null;
  @Output() closeModal = new EventEmitter<void>();

  lastUpdatedByMerits: string = 'Maria Santos (HR Manager)';
  lastUpdatedMerits: string = 'March 30, 2024 10:15 AM';
  lastUpdatedByViolations: string = 'Roberto Cruz (Department Head)';
  lastUpdatedViolations: string = 'April 2, 2024 3:45 PM';

  merits: Merit[] = [
    {
      date: '01/28/2024',
      type: 'Employee of the Month',
      description: 'Recognized for outstanding performance and exceeding targets by 15%',
      awardingBody: 'Management Committee',
      supportingDocument: 'View'
    },
    {
      date: '01/28/2024',
      type: 'Perfect Attendance',
      description: 'No absences or tardiness for the entire quarter (Q4 2023)',
      awardingBody: 'HR Department',
      supportingDocument: 'View'
    },
    {
      date: '11/15/2023',
      type: 'Special Recognition',
      description: 'Successfully completed critical project ahead of schedule',
      awardingBody: 'Executive Committee',
      supportingDocument: 'View'
    },
    {
      date: '09/05/2023',
      type: 'Innovation Award',
      description: 'Implemented process improvement saving 20 hours per month',
      awardingBody: 'Process Excellence Team',
      supportingDocument: 'View'
    }
  ];

  violations: Violation[] = [
    {
      date: '02/15/2024',
      type: 'Tardiness',
      description: 'Reported late five times in a month (February 2024)',
      actionTaken: 'Written Warning',
      status: 'Resolved',
      supportingDocument: 'View'
    },
    {
      date: '01/10/2024',
      type: 'Policy Violation',
      description: 'Unauthorized use of company resources for personal matters',
      actionTaken: 'Verbal Warning',
      status: 'Resolved',
      supportingDocument: 'View'
    },
    {
      date: '12/05/2023',
      type: 'Misconduct',
      description: 'Unprofessional behavior in workplace during team meeting',
      actionTaken: 'Suspension (1 day)',
      status: 'Resolved',
      supportingDocument: 'View'
    },
    {
      date: '04/01/2024',
      type: 'Attendance',
      description: 'Unexcused absence without proper notification',
      actionTaken: 'Written Warning',
      status: 'Pending',
      supportingDocument: 'View'
    }
  ];

  onClose(): void {
    this.closeModal.emit();
  }

  viewDocument(type: string, index: number): void {
    // Implement document viewing logic here
    console.log(`Viewing document for ${type} at index ${index}`);
  }
} 