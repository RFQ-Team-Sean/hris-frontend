import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  passwordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dummyService: DummyDataService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;

      this.dummyService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login successful:', response.user);
            localStorage.setItem('user', JSON.stringify(response.user)); // Store user info
            
            // Store personnel data in localStorage
            this.dummyService.getPersonnel().subscribe(personnelData => {
              localStorage.setItem('personnel', JSON.stringify(personnelData));
            });
            
            // ✅ Corrected route paths
            const roleBasedRoutes: { [key: string]: string } = {
              Admin: '/dashboard/admin', // ✅ Corrected admin route
              HR: '/dashboard/hr',
              Employee: '/dashboard/employee',
              Payroll_Manager: '/dashboard/payroll',
              Recruiter: '/dashboard/recruiter',
              Manager: '/dashboard/manager',
            };

            this.router.navigate([roleBasedRoutes[response.user.role] || '/dashboard']);
          } else {
            this.errorMessage = response.message; // Show error message
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
      this.markFormGroupTouched(this.loginForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
