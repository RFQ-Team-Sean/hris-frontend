import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf], // Import necessary modules
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private dummyService: DummyDataService) {
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
          console.log('Logged in as:', response.user);
          alert(`Welcome, ${response.user.username} (${response.user.role}) 🎉`);
        } else {
          this.errorMessage = response.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
    }
  }
}
