import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Competency {
  id: number;
  name: string;
  description: string;
  rating: number;
  comments: string;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
  comments: string;
}

interface Feedback {
  id: number;
  reviewer: {
    name: string;
    role: string;
    avatar: string;
  };
  ratings: {
    competency: number;
    performance: number;
    teamwork: number;
  };
  comments: string;
  status: string;
}

interface ManagerEvaluation {
  id: number;
  manager: {
    name: string;
    role: string;
    avatar: string;
  };
  overallRating: number;
  strengths: string[];
  areasForImprovement: string[];
  comments: string;
  status: 'pending' | 'completed';
  lastUpdated: string;
}

@Component({
  selector: 'app-employee-self-assessment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-self-assessment.component.html',
  styleUrl: './employee-self-assessment.component.scss'
})
export class EmployeeSelfAssessmentComponent implements OnInit {
  activeSection: 'self' | 'manager' | 'feedback' = 'self';
  assessmentForm: FormGroup;
  
  // Mock data for demonstration
  competencies: Competency[] = [
    {
      id: 1,
      name: 'Communication',
      description: 'Effectively communicates ideas and information',
      rating: 0,
      comments: ''
    },
    {
      id: 2,
      name: 'Problem Solving',
      description: 'Identifies and resolves issues efficiently',
      rating: 0,
      comments: ''
    },
    {
      id: 3,
      name: 'Teamwork',
      description: 'Collaborates effectively with team members',
      rating: 0,
      comments: ''
    }
  ];

  goals: Goal[] = [
    {
      id: 1,
      title: 'Complete Project X',
      description: 'Deliver the project within timeline and budget',
      status: 'In Progress',
      comments: ''
    },
    {
      id: 2,
      title: 'Improve Technical Skills',
      description: 'Complete advanced training in Angular',
      status: 'Not Started',
      comments: ''
    }
  ];

  managerEvaluation: ManagerEvaluation = {
    id: 1,
    manager: {
      name: 'Sarah Johnson',
      role: 'Senior Manager',
      avatar: 'assets/images/avatars/sarah.jpg'
    },
    overallRating: 4.5,
    strengths: [
      'Strong technical skills',
      'Excellent team player',
      'Proactive problem solver'
    ],
    areasForImprovement: [
      'Time management',
      'Presentation skills'
    ],
    comments: 'John has shown significant improvement in his technical skills and team collaboration. He consistently delivers high-quality work and takes initiative in solving complex problems. Areas for improvement include time management and presentation skills.',
    status: 'completed',
    lastUpdated: '2024-03-15'
  };

  feedbacks: Feedback[] = [
    {
      id: 1,
      reviewer: {
        name: 'John Smith',
        role: 'Team Lead',
        avatar: 'assets/images/avatars/john.jpg'
      },
      ratings: {
        competency: 4,
        performance: 5,
        teamwork: 4
      },
      comments: 'Excellent performance throughout the year. Shows great initiative and leadership.',
      status: 'completed'
    },
    {
      id: 2,
      reviewer: {
        name: 'Sarah Johnson',
        role: 'Peer',
        avatar: 'assets/images/avatars/sarah.jpg'
      },
      ratings: {
        competency: 5,
        performance: 4,
        teamwork: 5
      },
      comments: 'Great team player and always willing to help others.',
      status: 'completed'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Initialize form controls for competencies and goals
    this.competencies.forEach(competency => {
      this.assessmentForm.addControl(
        `competency_${competency.id}_rating`,
        new FormControl(competency.rating, [Validators.required])
      );
      this.assessmentForm.addControl(
        `competency_${competency.id}_comments`,
        new FormControl(competency.comments)
      );
    });

    this.goals.forEach(goal => {
      this.assessmentForm.addControl(
        `goal_${goal.id}_status`,
        new FormControl(goal.status, [Validators.required])
      );
      this.assessmentForm.addControl(
        `goal_${goal.id}_comments`,
        new FormControl(goal.comments)
      );
    });
  }

  // Helper method to safely get form controls
  getFormControl(controlName: string): FormControl {
    const control = this.assessmentForm.get(controlName);
    if (!control) {
      throw new Error(`Form control '${controlName}' not found`);
    }
    return control as FormControl;
  }

  setActiveSection(section: 'self' | 'manager' | 'feedback'): void {
    this.activeSection = section;
  }

  setRating(competencyId: number, rating: number): void {
    const control = this.assessmentForm.get(`competency_${competencyId}_rating`);
    if (control) {
      control.setValue(rating);
    }
  }

  saveAssessment(): void {
    if (this.assessmentForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Saving assessment:', this.assessmentForm.value);
      // Show success message
    } else {
      // Show error message
    }
  }

  submitAssessment(): void {
    if (this.assessmentForm.valid) {
      // Here you would typically send the form data to your backend
      console.log('Submitting assessment:', this.assessmentForm.value);
      // Show success message and update status
    } else {
      // Show error message
    }
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
  }

  printReport(): void {
    // Implement print functionality
    window.print();
  }
}
