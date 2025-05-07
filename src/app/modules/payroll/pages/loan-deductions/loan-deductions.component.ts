import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, map, combineLatest, BehaviorSubject } from 'rxjs';

type TabType = 'active' | 'completed' | 'mandatory' | 'history';

interface DeductionSummary {
  totalAmount: number;
  count: number;
  type: string;
}

@Component({
  selector: 'app-loan-deductions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-deductions.component.html',
  styleUrls: ['./loan-deductions.component.scss']
})
export class LoanDeductionsComponent implements OnInit {
  // Filter states
  selectedDeductionType = '';
  selectedDepartment = '';
  searchQuery = '';
  activeTab: TabType = 'active';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  // Data streams
  deductionsSubject = new BehaviorSubject<any[]>([]);
  deductions$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;
  loanRecords$: Observable<any[]>;
  
  // Make Math available in template
  Math = Math;

  // Summary calculations
  totalMonthlyDeductions$: Observable<number>;
  totalSssContributions$: Observable<number>;
  totalPagibigContributions$: Observable<number>;
  activeLoansCount$: Observable<number>;
  completedLoansCount$: Observable<number>;
  mandatoryContributionsCount$: Observable<number>;

  // Combined data for template
  personnelWithDepartments$: Observable<any[]>;

  // Modal states
  showAddModal = false;
  showEditModal = false;
  showStopModal = false;
  selectedDeduction: any = null;

  // New deduction form
  newDeduction = {
    personnel_id: '',
    deduction_type: '',
    amount: 0,
    start_date: new Date(),
    end_date: null as Date | null,
    status: 'Active'
  };

  // Edit deduction form
  editDeduction = {
    id: '',
    personnel_id: '',
    deduction_type: '',
    amount: 0,
    start_date: new Date(),
    end_date: null as Date | null,
    status: 'Active'
  };

  // Stop deduction confirmation
  stopDeduction = {
    id: '',
    personnel_id: '',
    deduction_type: '',
    reason: '',
    effective_date: new Date()
  };

  constructor(private dummyDataService: DummyDataService) {
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();
    this.loanRecords$ = this.dummyDataService.getLoanRecords();

    // Combine personnel and departments data
    this.personnelWithDepartments$ = combineLatest([this.personnel$, this.departments$]).pipe(
      map(([personnel, departments]) => {
        return personnel.map(p => ({
          ...p,
          department_name: departments.find(d => d.id === p.department_id)?.department_name || 'Unknown'
        }));
      })
    );

    // Initialize deductions with filtering
    this.deductions$ = combineLatest([
      this.dummyDataService.getDeductions(),
      this.personnelWithDepartments$,
      this.loanRecords$
    ]).pipe(
      map(([deductions, personnelWithDepts, loanRecords]) => {
        let filtered = [...deductions];

        // Apply tab filtering
        switch (this.activeTab) {
          case 'active':
            filtered = filtered.filter(d => {
              const loan = loanRecords.find(l => l.personnel_id === d.personnel_id);
              return loan?.status === 'Active' || d.deduction_type.includes('Loan');
            });
            break;
          case 'completed':
            filtered = filtered.filter(d => {
              const loan = loanRecords.find(l => l.personnel_id === d.personnel_id);
              return loan?.status === 'Fully_Paid';
            });
            break;
          case 'mandatory':
            filtered = filtered.filter(d => 
              d.deduction_type === 'SSS Contribution' || 
              d.deduction_type === 'Pag-IBIG Contribution' || 
              d.deduction_type === 'PhilHealth'
            );
            break;
          case 'history':
            // Show all deductions for history
            break;
        }

        // Apply filters
        if (this.selectedDeductionType) {
          filtered = filtered.filter(d => d.deduction_type === this.selectedDeductionType);
        }

        if (this.selectedDepartment) {
          filtered = filtered.filter(d => {
            const personnel = personnelWithDepts.find(p => p.id === d.personnel_id);
            return personnel?.department_name === this.selectedDepartment;
          });
        }

        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(d => {
            const personnel = personnelWithDepts.find(p => p.id === d.personnel_id);
            const fullName = `${personnel?.first_name} ${personnel?.last_name}`.toLowerCase();
            return fullName.includes(query) || d.personnel_id.toLowerCase().includes(query);
          });
        }

        // Update total items for pagination
        this.totalItems = filtered.length;

        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return filtered.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );

    // Calculate totals and counts
    this.totalMonthlyDeductions$ = this.dummyDataService.getDeductions().pipe(
      map(deductions => deductions.reduce((sum, d) => sum + this.calculateTotalDeductions(d), 0))
    );

    this.totalSssContributions$ = this.dummyDataService.getDeductions().pipe(
      map(deductions => deductions.reduce((sum, d) => sum + d.sss, 0))
    );

    this.totalPagibigContributions$ = this.dummyDataService.getDeductions().pipe(
      map(deductions => deductions.reduce((sum, d) => sum + d.pagibig, 0))
    );

    this.activeLoansCount$ = this.loanRecords$.pipe(
      map(loans => loans.filter(l => l.status === 'Active').length)
    );

    this.completedLoansCount$ = this.loanRecords$.pipe(
      map(loans => loans.filter(l => l.status === 'Fully_Paid').length)
    );

    this.mandatoryContributionsCount$ = this.dummyDataService.getDeductions().pipe(
      map(deductions => deductions.filter(d => 
        d.deduction_type === 'SSS Contribution' || 
        d.deduction_type === 'Pag-IBIG Contribution' || 
        d.deduction_type === 'PhilHealth'
      ).length)
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Tab handling
  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.selectedDeductionType = ''; // Reset filters when changing tabs
    this.applyFilters();
  }

  // Add new deduction
  openAddModal(): void {
    this.showAddModal = true;
    this.newDeduction = {
      personnel_id: '',
      deduction_type: '',
      amount: 0,
      start_date: new Date(),
      end_date: null,
      status: 'Active'
    };
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  saveNewDeduction(): void {
    // In a real app, this would call an API
    console.log('Saving new deduction:', this.newDeduction);
    this.closeAddModal();
    this.applyFilters();
  }

  // Edit deduction
  openEditModal(deduction: any): void {
    this.selectedDeduction = deduction;
    this.editDeduction = {
      id: deduction.id,
      personnel_id: deduction.personnel_id,
      deduction_type: deduction.deduction_type,
      amount: this.calculateTotalDeductions(deduction),
      start_date: new Date(deduction.start_date || new Date()),
      end_date: deduction.end_date ? new Date(deduction.end_date) : null,
      status: deduction.status
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedDeduction = null;
  }

  saveEditDeduction(): void {
    // In a real app, this would call an API
    console.log('Saving edited deduction:', this.editDeduction);
    
    // Update the deduction in the local state
    const currentDeductions = this.deductionsSubject.value;
    const index = currentDeductions.findIndex(d => d.id === this.editDeduction.id);
    
    if (index !== -1) {
      currentDeductions[index] = {
        ...currentDeductions[index],
        ...this.editDeduction,
        // Update the specific deduction amounts based on type
        sss: this.editDeduction.deduction_type === 'SSS Loan' || this.editDeduction.deduction_type === 'SSS Contribution' ? this.editDeduction.amount : 0,
        pagibig: this.editDeduction.deduction_type === 'Pag-IBIG Loan' || this.editDeduction.deduction_type === 'Pag-IBIG Contribution' ? this.editDeduction.amount : 0,
        philhealth: this.editDeduction.deduction_type === 'PhilHealth' ? this.editDeduction.amount : 0,
        loans: this.editDeduction.deduction_type.includes('Loan') ? this.editDeduction.amount : 0,
        other_deductions: 0
      };
      this.deductionsSubject.next(currentDeductions);
    }

    this.closeEditModal();
    this.applyFilters();
  }

  // Stop deduction
  openStopModal(deduction: any): void {
    this.selectedDeduction = deduction;
    this.stopDeduction = {
      id: deduction.id,
      personnel_id: deduction.personnel_id,
      deduction_type: deduction.deduction_type,
      reason: '',
      effective_date: new Date()
    };
    this.showStopModal = true;
  }

  closeStopModal(): void {
    this.showStopModal = false;
    this.selectedDeduction = null;
  }

  confirmStopDeduction(): void {
    // In a real app, this would call an API
    console.log('Stopping deduction:', this.stopDeduction);
    
    // Update the deduction status in the local state
    const currentDeductions = this.deductionsSubject.value;
    const index = currentDeductions.findIndex(d => d.id === this.stopDeduction.id);
    
    if (index !== -1) {
      currentDeductions[index] = {
        ...currentDeductions[index],
        status: 'Completed',
        end_date: this.stopDeduction.effective_date
      };
      this.deductionsSubject.next(currentDeductions);
    }

    this.closeStopModal();
    this.applyFilters();
  }

  // Format currency (Philippine Peso)
  formatCurrency(amount: number): string {
    return amount ? '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '-';
  }

  // Format date
  formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Active':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Pending Approval':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Completed':
        return { background: '#e5e7eb', text: '#4b5563' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Calculate total deductions
  calculateTotalDeductions(deduction: any): number {
    return deduction.bir + deduction.pagibig + deduction.philhealth + deduction.sss + deduction.loans + deduction.other_deductions;
  }

  // Get personnel name by ID
  getPersonnelName(personnelId: string, personnelList: any[] | null): string {
    if (!personnelList) return 'Unknown';
    const personnel = personnelList.find(p => p.id === personnelId);
    return personnel ? `${personnel.first_name} ${personnel.last_name}` : 'Unknown';
  }

  // Get personnel department by ID
  getPersonnelDepartment(personnelId: string, personnelList: any[] | null): string {
    if (!personnelList) return 'Unknown';
    const personnel = personnelList.find(p => p.id === personnelId);
    if (!personnel) return 'Unknown';
    
    return personnel.department_name || 'Unknown';
  }

  // Apply filters
  applyFilters(): void {
    this.currentPage = 1; // Reset to first page when filters change
    this.deductionsSubject.next([]); // Trigger refresh
  }

  // Pagination methods
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.deductionsSubject.next([]); // Trigger refresh
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.deductionsSubject.next([]); // Trigger refresh
    }
  }

  // Get total pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Get page range for pagination display
  get pageRange(): number[] {
    const range = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  // Get deduction type options based on active tab
  getDeductionTypeOptions(): string[] {
    switch (this.activeTab) {
      case 'active':
        return ['SSS Loan', 'Pag-IBIG Loan', 'Company Loan'];
      case 'completed':
        return ['SSS Loan', 'Pag-IBIG Loan', 'Company Loan'];
      case 'mandatory':
        return ['SSS Contribution', 'Pag-IBIG Contribution', 'PhilHealth'];
      case 'history':
        return ['All Types', 'SSS Loan', 'Pag-IBIG Loan', 'Company Loan', 'SSS Contribution', 'Pag-IBIG Contribution', 'PhilHealth'];
      default:
        return [];
    }
  }
}