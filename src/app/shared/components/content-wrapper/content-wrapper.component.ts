import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-6 pr-6 bg-gray-100 min-h-screen">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class ContentWrapperComponent {
  constructor() {}
} 