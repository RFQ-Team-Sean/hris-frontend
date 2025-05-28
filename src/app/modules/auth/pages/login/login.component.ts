import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginResponse } from '../../../../core/services/auth.service';

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
    private authService: AuthService,
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

      this.authService.login(email, password).subscribe({
        next: (response: LoginResponse) => {
          if (response.success && response.user) {
            // Store user info and token
            localStorage.setItem('user', JSON.stringify(response.user));
            if (response.user.token) {
              localStorage.setItem('token', response.user.token);
            }
            
            // Navigate based on role
            const roleBasedRoutes: { [key: string]: string } = {
              Admin: '/dashboard/admin',
              HR: '/dashboard/hr',
              Employee: '/dashboard/employee',
              Payroll_Manager: '/dashboard/payroll',
              Recruiter: '/dashboard/recruiter',
              Manager: '/dashboard/manager',
            };

            this.router.navigate([roleBasedRoutes[response.user.role] || '/dashboard']);
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
            this.isLoading = false;
          }
        },
        error: (error: any) => {
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'An error occurred during login. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
