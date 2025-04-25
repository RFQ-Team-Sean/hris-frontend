import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Define types based on database schema
enum EmploymentType {
  Regular = 'Regular',
  Contractual = 'Contractual',
  Part_time = 'Part_time',
  Temporary = 'Temporary',
  Consultant = 'Consultant'
}

enum ApplicationStatus {
  Pending = 'Pending',
  Pre_Screening = 'Pre_Screening',
  For_Interview = 'For_Interview',
  For_Examination = 'For_Examination',
  Shortlisted = 'Shortlisted',
  Selected = 'Selected',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  Hired = 'Hired'
}

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss'
})
export class JobApplicationComponent implements OnInit {
  personalForm!: FormGroup;
  educationForm!: FormGroup;
  experienceForm!: FormGroup;
  skillsForm!: FormGroup;
  documentForm!: FormGroup;
  
  jobTitle: string = 'Software Engineer';
  jobId: string = 'JOB-2023-001';
  currentStep: number = 1;
  totalSteps: number = 5;
  
  // File handling properties
  resumeFileName: string = '';
  coverLetterFileName: string = '';
  additionalDocumentsCount: number = 0;
  
  // Employment type options from database schema
  employmentTypes = Object.values(EmploymentType);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    // Personal Information Form (aligned with JobApplicant model)
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      dateOfBirth: [''],
      isExistingEmployee: [false]
    });

    // Education Form
    this.educationForm = this.fb.group({
      highestQualification: ['', Validators.required],
      institution: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      graduationYear: ['', Validators.required],
      gpa: ['']
    });

    // Work Experience Form
    this.experienceForm = this.fb.group({
      currentlyEmployed: [false],
      currentEmployer: [''],
      currentPosition: [''],
      employmentType: ['', Validators.required],
      workExperience: ['', Validators.required],
      relevantExperience: ['', Validators.required]
    });

    // Skills Form
    this.skillsForm = this.fb.group({
      skills: ['', Validators.required],
      languages: [''],
      certifications: ['']
    });

    // Documents Form
    this.documentForm = this.fb.group({
      resume: [null, Validators.required],
      coverLetter: [null],
      additionalDocuments: [null],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // File handling method
  onFileSelected(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files?.length) return;
    
    if (fileType === 'resume') {
      const file = input.files[0];
      this.resumeFileName = file.name;
      this.documentForm.patchValue({
        resume: file
      });
      this.documentForm.get('resume')?.markAsTouched();
    } 
    else if (fileType === 'coverLetter') {
      const file = input.files[0];
      this.coverLetterFileName = file.name;
      this.documentForm.patchValue({
        coverLetter: file
      });
    } 
    else if (fileType === 'additionalDocuments') {
      const files = Array.from(input.files);
      this.additionalDocumentsCount = files.length;
      this.documentForm.patchValue({
        additionalDocuments: files.length === 1 ? files[0] : files
      });
    }
  }

  onSubmit(): void {
    if (this.personalForm.valid && 
        this.educationForm.valid && 
        this.experienceForm.valid && 
        this.skillsForm.valid && 
        this.documentForm.valid) {
      
      // Format data according to database schema (JobApplicant and JobApplication)
      const applicantData = {
        // JobApplicant fields
        first_name: this.personalForm.value.firstName,
        last_name: this.personalForm.value.lastName,
        middle_name: this.personalForm.value.middleName,
        email: this.personalForm.value.email,
        phone: this.personalForm.value.phone,
        current_employer: this.experienceForm.value.currentEmployer,
        highest_education: this.educationForm.value.highestQualification,
        resume_path: this.resumeFileName, // This will be updated with actual path after upload
        is_existing_employee: this.personalForm.value.isExistingEmployee,
        application_date: new Date(),
      };
      
      const applicationData = {
        // JobApplication fields
        position_id: this.jobId,
        cover_letter: this.coverLetterFileName ? this.coverLetterFileName : null,
        status: ApplicationStatus.Pending,
        application_date: new Date(),
        // Additional form data not directly in schema but important for processing
        education: this.educationForm.value,
        experience: this.experienceForm.value,
        skills: this.skillsForm.value,
        documents: {
          resume: this.resumeFileName,
          coverLetter: this.coverLetterFileName,
          additionalDocuments: this.additionalDocumentsCount > 0 ? `${this.additionalDocumentsCount} file(s)` : null
        },
        address: {
          address: this.personalForm.value.address,
          city: this.personalForm.value.city,
          state: this.personalForm.value.state,
          zipCode: this.personalForm.value.zipCode
        }
      };

      console.log('Applicant Data:', applicantData);
      console.log('Application Data:', applicationData);
      
      // Call service to submit application
      // this.jobApplicationService.submitApplication(applicantData, applicationData).subscribe(...);
    } else {
      // Mark all fields as touched to trigger validation errors
      this.markFormGroupTouched(this.personalForm);
      this.markFormGroupTouched(this.educationForm);
      this.markFormGroupTouched(this.experienceForm);
      this.markFormGroupTouched(this.skillsForm);
      this.markFormGroupTouched(this.documentForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
