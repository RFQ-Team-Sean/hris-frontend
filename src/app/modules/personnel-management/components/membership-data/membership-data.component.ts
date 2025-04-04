import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MembershipDocument {
  filename: string;
  filesize: string;
}

interface Membership {
  type: string;
  status: 'Active' | 'Inactive';
  accountNumber?: string;
  document?: MembershipDocument;
  monthlyContribution?: number;
  employerShare?: number;
  employeeShare?: number;
  totalContribution?: number;
  lastPaymentDate?: string;
  contributionStartDate?: string;
  totalContributionsToDate?: number;
  pendingContributions?: number;
  lastUpdatedBy?: string;
}

interface Employee {
  id?: number;
  name?: string;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  memberships?: Membership[];
}

@Component({
  selector: 'app-membership-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-data.component.html',
  styleUrl: './membership-data.component.scss'
})
export class MembershipDataComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Input() showEditButton: boolean = false;

  memberships: Membership[] = [];

  ngOnInit() {
    this.initializeMemberships();
  }

  initializeMemberships() {
    // Initialize with default or provided memberships
    this.memberships = [
      {
        type: 'Government Service Insurance System (GSIS)',
        status: 'Active',
        accountNumber: this.employee?.gsisNumber || '1276351371823',
        document: { filename: 'asjkdvgshakalsfas.pdf', filesize: '10.7kb' },
        monthlyContribution: 120,
        employerShare: 100,
        employeeShare: 20,
        totalContribution: 1270,
        lastPaymentDate: 'Feb 2025',
        contributionStartDate: 'Jan 2024',
        totalContributionsToDate: 15240,
        pendingContributions: 0,
        lastUpdatedBy: 'HR Manager'
      },
      {
        type: 'Home Development Mutual Fund (Pag-IBIG)',
        status: 'Active',
        accountNumber: this.employee?.pagibigNumber || '274687231124',
        document: { filename: 'asjkdvgshakalsfas.pdf', filesize: '10.7kb' },
        monthlyContribution: 120,
        employerShare: 100,
        employeeShare: 20,
        totalContribution: 1270,
        lastPaymentDate: 'Feb 2025',
        contributionStartDate: 'Mar 2024',
        totalContributionsToDate: 12700,
        pendingContributions: 120,
        lastUpdatedBy: 'Payroll Officer'
      },
      {
        type: 'Philippine Health Insurance Corporation (PhilHealth)',
        status: 'Inactive',
        accountNumber: this.employee?.philhealthNumber,
        monthlyContribution: 120,
        employerShare: 100,
        employeeShare: 20,
        totalContribution: 1270,
        lastPaymentDate: 'Feb 2025',
        contributionStartDate: 'Feb 2024',
        totalContributionsToDate: 2540,
        pendingContributions: 240,
        lastUpdatedBy: 'System Admin'
      },
      {
        type: 'Social Security System (SSS)',
        status: 'Inactive',
        accountNumber: this.employee?.sssNumber,
        monthlyContribution: 120,
        employerShare: 100,
        employeeShare: 20,
        totalContribution: 1270,
        lastPaymentDate: 'Feb 2025',
        contributionStartDate: 'Jan 2024',
        totalContributionsToDate: 10160,
        pendingContributions: 0,
        lastUpdatedBy: 'HR Admin'
      }
    ];
  }

  downloadDocument(membership: Membership) {
    console.log('Downloading document for', membership.type);
    // Add download logic here
  }

  viewDocument(membership: Membership) {
    console.log('Viewing document for', membership.type);
    // Add view logic here
  }

  uploadDocument(membership: Membership, event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading document for ${membership.type}:`, file.name);
      // Add file upload logic here
    }
  }

  editInformation() {
    console.log('Editing membership information');
    // Add edit logic here
  }
}
