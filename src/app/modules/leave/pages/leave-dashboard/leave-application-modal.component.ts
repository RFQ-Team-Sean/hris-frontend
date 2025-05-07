import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-application-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" *ngIf="isOpen">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Leave Application Details</h3>
            <button (click)="onClose()" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Employee</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.personnel_name}}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Department</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.department_name}}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Leave Type</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.leave_type_name}}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Duration</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.duration}} days</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Start Date</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.start_date | date:'mediumDate'}}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">End Date</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.end_date | date:'mediumDate'}}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm font-medium text-gray-500">Reason</p>
              <p class="mt-1 text-sm text-gray-900">{{application?.reason || 'Not specified'}}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm font-medium text-gray-500">Status</p>
              <p class="mt-1">
                <span [style.background-color]="getStatusColor(application?.status).background"
                      [style.color]="getStatusColor(application?.status).text"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{application?.status}}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button *ngIf="application?.status === 'Pending'"
                  (click)="onApprove()"
                  [disabled]="isProcessing"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
            <svg *ngIf="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{isProcessing ? 'Processing...' : 'Approve'}}
          </button>
          <button *ngIf="application?.status === 'Pending'"
                  (click)="onReject()"
                  [disabled]="isProcessing"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
            <svg *ngIf="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{isProcessing ? 'Processing...' : 'Reject'}}
          </button>
          <button (click)="onClose()"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Close
          </button>
        </div>
      </div>
    </div>
  `
})
export class LeaveApplicationModalComponent {
  @Input() isOpen = false;
  @Input() application: any;
  @Input() isProcessing = false;
  @Output() close = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onApprove(): void {
    this.approve.emit();
  }

  onReject(): void {
    this.reject.emit();
  }

  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Pending':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Approved':
        return { background: '#ecfdf5', text: '#065f46' };
      case 'Rejected':
        return { background: '#fee2e2', text: '#b91c1c' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }
} 