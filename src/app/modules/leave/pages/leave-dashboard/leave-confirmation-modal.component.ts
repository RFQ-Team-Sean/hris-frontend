import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" *ngIf="isOpen">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">{{action === 'approve' ? 'Approve Leave' : 'Reject Leave'}}</h3>
            <button (click)="onClose()" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 py-4">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full" 
                 [ngClass]="action === 'approve' ? 'bg-green-100' : 'bg-red-100'">
              <svg class="h-6 w-6" 
                   [ngClass]="action === 'approve' ? 'text-green-600' : 'text-red-600'"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <ng-container *ngIf="action === 'approve'">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </ng-container>
                <ng-container *ngIf="action === 'reject'">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </ng-container>
              </svg>
            </div>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              {{action === 'approve' ? 'Approve Leave Application' : 'Reject Leave Application'}}
            </h3>
            <div class="mt-2 text-sm text-gray-500">
              <p>Are you sure you want to {{action === 'approve' ? 'approve' : 'reject'}} this leave application?</p>
              <p class="mt-2 font-medium">{{application?.personnel_name}}</p>
              <p class="text-xs">{{application?.start_date | date:'mediumDate'}} - {{application?.end_date | date:'mediumDate'}}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button (click)="onClose()"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button (click)="onConfirm()"
                  [disabled]="isProcessing"
                  [ngClass]="action === 'approve' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50">
            <svg *ngIf="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{isProcessing ? 'Processing...' : (action === 'approve' ? 'Approve' : 'Reject')}}
          </button>
        </div>
      </div>
    </div>
  `
})
export class LeaveConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() action: 'approve' | 'reject' = 'approve';
  @Input() application: any;
  @Input() isProcessing = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
} 