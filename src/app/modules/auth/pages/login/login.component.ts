import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

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

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.dummyService.login(email, password).subscribe(response => {
        if (response.success) {
          console.log('Login successful:', response.user);
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user info
          
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
        }
      });
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
    }
  }
}
