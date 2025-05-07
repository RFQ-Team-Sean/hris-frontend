import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  // Users Table
  private users = [
    { id: '1', username: 'admin', email: 'admin@example.com', password_hash: 'password', role: 'Admin', status: 'Active', created_at: new Date(), updated_at: new Date() },
    { id: '2', username: 'hr_manager', email: 'hr@example.com', password_hash: 'password', role: 'HR', status: 'Active', created_at: new Date(), updated_at: new Date() },
    { id: '3', username: 'employee_john', email: 'john@example.com', password_hash: 'password', role: 'Employee', status: 'Active', created_at: new Date(), updated_at: new Date() },
    { id: '4', username: 'payroll_mgr', email: 'payroll@example.com', password_hash: 'password', role: 'Payroll_Manager', status: 'Active', created_at: new Date(), updated_at: new Date() },
    { id: '5', username: 'recruiter_anna', email: 'anna@example.com', password_hash: 'password', role: 'Recruiter', status: 'Active', created_at: new Date(), updated_at: new Date() },
    { id: '6', username: 'manager_mike', email: 'mike@example.com', password_hash: 'password', role: 'Manager', status: 'Active', created_at: new Date(), updated_at: new Date() }
  ];

  // Departments Table
  private departments = [
    { id: '1', department_name: 'Administration', department_head: '1', description: 'Administrative Department', created_at: new Date() },
    { id: '2', department_name: 'Human Resources', department_head: '2', description: 'HR Department', created_at: new Date() },
    { id: '3', department_name: 'Information Technology', department_head: '3', description: 'IT Department', created_at: new Date() },
    { id: '4', department_name: 'Finance', department_head: '4', description: 'Finance Department', created_at: new Date() },
    { id: '5', department_name: 'Operations', department_head: '5', description: 'Operations Department', created_at: new Date() }
  ];

  // Personnel Table
  private personnel = [
    { 
      id: '1', 
      user_id: '1', 
      first_name: 'John', 
      last_name: 'Smith', 
      middle_name: 'A', 
      date_of_birth: new Date('1980-01-01'), 
      gender: 'Male', 
      civil_status: 'Single', 
      contact_number: '09123456789', 
      address: '123 Admin St', 
      department_id: '1', 
      designation: 'System Administrator', 
      employment_type: 'Regular', 
      date_hired: new Date('2020-01-01'), 
      salary: 50000, 
      gsis_number: '123456789', 
      pagibig_number: '123456789', 
      philhealth_number: '123456789', 
      sss_number: '123456789', 
      tin_number: '123456789', 
      created_at: new Date() 
    },
    { 
      id: '2', 
      user_id: '2', 
      first_name: 'Sarah', 
      last_name: 'Johnson', 
      middle_name: 'B', 
      date_of_birth: new Date('1985-02-02'), 
      gender: 'Female', 
      civil_status: 'Married', 
      contact_number: '09234567890', 
      address: '456 HR Ave', 
      department_id: '2', 
      designation: 'HR Manager', 
      employment_type: 'Regular', 
      date_hired: new Date('2019-06-01'), 
      salary: 45000, 
      gsis_number: '234567890', 
      pagibig_number: '234567890', 
      philhealth_number: '234567890', 
      sss_number: '234567890', 
      tin_number: '234567890', 
      created_at: new Date() 
    },
    { 
      id: '3', 
      user_id: '3', 
      first_name: 'Michael', 
      last_name: 'Williams', 
      middle_name: 'C', 
      date_of_birth: new Date('1990-03-03'), 
      gender: 'Male', 
      civil_status: 'Single', 
      contact_number: '09345678901', 
      address: '789 IT Blvd', 
      department_id: '3', 
      designation: 'Senior Developer', 
      employment_type: 'Regular', 
      date_hired: new Date('2018-03-15'), 
      salary: 60000, 
      gsis_number: '345678901', 
      pagibig_number: '345678901', 
      philhealth_number: '345678901', 
      sss_number: '345678901', 
      tin_number: '345678901', 
      created_at: new Date() 
    },
    { 
      id: '4', 
      user_id: '4', 
      first_name: 'Emily', 
      last_name: 'Davis', 
      middle_name: 'D', 
      date_of_birth: new Date('1992-04-04'), 
      gender: 'Female', 
      civil_status: 'Single', 
      contact_number: '09456789012', 
      address: '321 Finance St', 
      department_id: '4', 
      designation: 'Finance Manager', 
      employment_type: 'Regular', 
      date_hired: new Date('2019-09-01'), 
      salary: 55000, 
      gsis_number: '456789012', 
      pagibig_number: '456789012', 
      philhealth_number: '456789012', 
      sss_number: '456789012', 
      tin_number: '456789012', 
      created_at: new Date() 
    },
    { 
      id: '5', 
      user_id: '5', 
      first_name: 'David', 
      last_name: 'Brown', 
      middle_name: 'E', 
      date_of_birth: new Date('1988-05-05'), 
      gender: 'Male', 
      civil_status: 'Married', 
      contact_number: '09567890123', 
      address: '654 Ops Ave', 
      department_id: '5', 
      designation: 'Operations Manager', 
      employment_type: 'Regular', 
      date_hired: new Date('2017-12-01'), 
      salary: 52000, 
      gsis_number: '567890123', 
      pagibig_number: '567890123', 
      philhealth_number: '567890123', 
      sss_number: '567890123', 
      tin_number: '567890123', 
      created_at: new Date() 
    }
  ];

  // Employment History
  private employmentHistory = [
    { 
      id: '1', 
      personnel_id: '1', 
      organization: 'Previous Company', 
      position: 'IT Manager', 
      start_date: new Date('2015-01-01'), 
      end_date: new Date('2019-12-31'), 
      employment_type: 'Regular' 
    }
  ];

  // Work Schedules
  private workSchedules = [
    { 
      id: '1', 
      schedule_name: 'Regular 9-5', 
      is_flextime: false, 
      start_time: new Date('2024-01-01T09:00:00'), 
      end_time: new Date('2024-01-01T17:00:00'), 
      break_start_time: new Date('2024-01-01T12:00:00'), 
      break_end_time: new Date('2024-01-01T13:00:00'), 
      break_deducted: true, 
      is_work_from_home: false, 
      created_at: new Date() 
    }
  ];

  // Personnel Schedules
  private personnelSchedules = [
    { 
      id: '1', 
      personnel_id: '1', 
      schedule_id: '1', 
      start_date: new Date('2024-01-01'), 
      end_date: new Date('2024-12-31'), 
      created_by: '1', 
      created_at: new Date() 
    }
  ];

  // Attendance Logs
  private attendanceLogs = [
    { 
      id: '1', 
      personnel_id: '1', 
      log_date: new Date('2024-01-01'), 
      time_in: new Date('2024-01-01T08:55:00'), 
      time_out: new Date('2024-01-01T17:05:00'), 
      total_hours: 8, 
      status: 'Present', 
      biometric_used: true 
    },
    { 
      id: '2', 
      personnel_id: '2', 
      log_date: new Date('2024-01-01'), 
      time_in: new Date('2024-01-01T09:15:00'), 
      time_out: new Date('2024-01-01T17:30:00'), 
      total_hours: 8.25, 
      status: 'Late', 
      biometric_used: true 
    },
    { 
      id: '3', 
      personnel_id: '3', 
      log_date: new Date('2024-01-01'), 
      time_in: new Date('2024-01-01T08:45:00'), 
      time_out: new Date('2024-01-01T17:15:00'), 
      total_hours: 8.5, 
      status: 'Present', 
      biometric_used: true 
    },
    { 
      id: '4', 
      personnel_id: '4', 
      log_date: new Date('2024-01-01'), 
      time_in: null, 
      time_out: null, 
      total_hours: 0, 
      status: 'Absent', 
      biometric_used: false 
    },
    { 
      id: '5', 
      personnel_id: '5', 
      log_date: new Date('2024-01-01'), 
      time_in: new Date('2024-01-01T08:50:00'), 
      time_out: new Date('2024-01-01T17:10:00'), 
      total_hours: 8.33, 
      status: 'Present', 
      biometric_used: true 
    },
    { 
      id: '6', 
      personnel_id: '1', 
      log_date: new Date('2024-01-02'), 
      time_in: new Date('2024-01-02T08:58:00'), 
      time_out: new Date('2024-01-02T17:02:00'), 
      total_hours: 8.07, 
      status: 'Present', 
      biometric_used: true 
    },
    { 
      id: '7', 
      personnel_id: '2', 
      log_date: new Date('2024-01-02'), 
      time_in: new Date('2024-01-02T09:20:00'), 
      time_out: new Date('2024-01-02T17:35:00'), 
      total_hours: 8.25, 
      status: 'Late', 
      biometric_used: true 
    },
    { 
      id: '8', 
      personnel_id: '3', 
      log_date: new Date('2024-01-02'), 
      time_in: null, 
      time_out: null, 
      total_hours: 0, 
      status: 'On_Leave', 
      biometric_used: false 
    },
    { 
      id: '9', 
      personnel_id: '4', 
      log_date: new Date('2024-01-02'), 
      time_in: new Date('2024-01-02T08:52:00'), 
      time_out: new Date('2024-01-02T17:08:00'), 
      total_hours: 8.27, 
      status: 'Present', 
      biometric_used: true 
    },
    { 
      id: '10', 
      personnel_id: '5', 
      log_date: new Date('2024-01-02'), 
      time_in: new Date('2024-01-02T09:10:00'), 
      time_out: new Date('2024-01-02T17:20:00'), 
      total_hours: 8.17, 
      status: 'Late', 
      biometric_used: true 
    }
  ];

  // DTR Adjustment Requests
  private dtrAdjustmentRequests = [
    { 
      id: '1', 
      personnel_id: '1', 
      log_date: new Date('2024-01-01'), 
      original_time_in: new Date('2024-01-01T09:00:00'), 
      original_time_out: new Date('2024-01-01T17:00:00'), 
      requested_time_in: new Date('2024-01-01T08:30:00'), 
      requested_time_out: new Date('2024-01-01T17:30:00'), 
      reason: 'Early meeting', 
      status: 'Pending', 
      request_date: new Date() 
    },
    { 
      id: '2', 
      personnel_id: '2', 
      log_date: new Date('2024-01-02'), 
      original_time_in: new Date('2024-01-02T09:00:00'), 
      original_time_out: new Date('2024-01-02T17:00:00'), 
      requested_time_in: new Date('2024-01-02T09:30:00'), 
      requested_time_out: new Date('2024-01-02T18:00:00'), 
      reason: 'Traffic delay', 
      status: 'Approved', 
      request_date: new Date() 
    },
    { 
      id: '3', 
      personnel_id: '1', 
      log_date: new Date('2024-01-03'), 
      original_time_in: new Date('2024-01-03T09:00:00'), 
      original_time_out: new Date('2024-01-03T17:00:00'), 
      requested_time_in: new Date('2024-01-03T08:00:00'), 
      requested_time_out: new Date('2024-01-03T16:00:00'), 
      reason: 'Doctor appointment', 
      status: 'Rejected', 
      request_date: new Date() 
    }
  ];

  // Leave Types
  private leaveTypes = [
    { 
      id: '1', 
      leave_type_name: 'Vacation Leave', 
      description: 'Annual vacation leave', 
      requires_document: false, 
      max_days: 15, 
      is_active: true, 
      created_at: new Date() 
    }
  ];

  // Leave Balances
  private leaveBalances = [
    { 
      id: '1', 
      personnel_id: '1', 
      leave_type_id: '1', 
      year: '2024', 
      total_credits: 15, 
      used_credits: 5, 
      earned_credits: 1.25, 
      last_updated: new Date() 
    }
  ];

  // Leave Applications
  private leaveApplications = [
    { 
      id: '1', 
      personnel_id: '1', 
      leave_type_id: '1', 
      start_date: new Date('2024-02-01'), 
      end_date: new Date('2024-02-05'), 
      total_days: 5, 
      status: 'Pending', 
      reason: 'Family vacation', 
      request_date: new Date() 
    },
    {
      id: '2',
      personnel_id: '2', 
      leave_type_id: '1',
      start_date: new Date('2024-03-15'),
      end_date: new Date('2024-03-17'),
      total_days: 3,
      status: 'Approved',
      reason: 'Personal matters',
      request_date: new Date()
    },
    {
      id: '3',
      personnel_id: '1',
      leave_type_id: '1', 
      start_date: new Date('2024-04-10'),
      end_date: new Date('2024-04-14'),
      total_days: 5,
      status: 'Rejected',
      reason: 'Team building event',
      request_date: new Date()
    },
    {
      id: '4',
      personnel_id: '3',
      leave_type_id: '1',
      start_date: new Date('2024-05-01'),
      end_date: new Date('2024-05-02'),
      total_days: 2,
      status: 'Pending',
      reason: 'Wedding anniversary',
      request_date: new Date()
    }
  ];

  // Leave Monetization
  private leaveMonetization = [
    { 
      id: '1', 
      personnel_id: '1', 
      leave_type_id: '1', 
      days_to_monetize: 5, 
      status: 'Pending', 
      amount: 5000, 
      request_date: new Date() 
    }
  ];

  // Overtime Requests
  private overtimeRequests = [
    { 
      id: '1', 
      personnel_id: '1', 
      overtime_date: new Date('2024-01-15'), 
      start_time: new Date('2024-01-15T17:00:00'), 
      end_time: new Date('2024-01-15T20:00:00'), 
      total_hours: 3, 
      reason: 'Project deadline', 
      status: 'Pending', 
      request_date: new Date() 
    }
  ];

  // Personnel Movements
  private personnelMovements = [
    { 
      id: '1', 
      personnel_id: '1', 
      movement_type: 'Promotion', 
      previous_department_id: '1', 
      new_department_id: '2', 
      previous_designation: 'Senior Developer', 
      new_designation: 'Team Lead', 
      previous_salary: 40000, 
      new_salary: 50000, 
      effective_date: new Date('2024-01-01'), 
      issued_by: '1', 
      issued_date: new Date('2023-12-15'), 
      remarks: 'Promotion due to excellent performance' 
    }
  ];

  // Merit Violations
  private meritViolations = [
    { 
      id: '1', 
      personnel_id: '1', 
      record_type: 'Merit', 
      description: 'Employee of the Month', 
      date_recorded: new Date('2024-01-01'), 
      documented_by: '2' 
    }
  ];

  // Administrative Cases
  private administrativeCases = [
    { 
      id: '1', 
      personnel_id: '1', 
      case_title: 'Workplace Conduct', 
      case_description: 'Investigation of workplace behavior', 
      case_status: 'Filed', 
      date_filed: new Date('2024-01-01'), 
      filed_by: '2' 
    }
  ];

  // Payroll Records
  private payrollRecords = [
    { 
      id: '1', 
      personnel_id: '1', 
      payroll_period_start: new Date('2024-01-01'), 
      payroll_period_end: new Date('2024-01-15'), 
      basic_salary: 50000, 
      salary_adjustments: 0, 
      gross_salary: 50000, 
      total_deductions: 5000, 
      net_amount_due: 45000, 
      payment_status: 'Processed', 
      processed_date: new Date() 
    }
  ];

  // Deductions
  private deductions = [
    { 
      id: '1', 
      personnel_id: '1', 
      payroll_id: '1', 
      bir: 1000, 
      pagibig: 100, 
      philhealth: 200, 
      sss: 500, 
      loans: 2000, 
      other_deductions: 1200 
    }
  ];

  // Loan Records
  private loanRecords = [
    { 
      id: '1', 
      personnel_id: '1', 
      loan_type: 'Multi_Purpose', 
      loan_source: 'Company', 
      loan_amount: 50000, 
      monthly_deduction: 2000, 
      start_date: new Date('2024-01-01'), 
      end_date: new Date('2024-12-31'), 
      remaining_balance: 48000, 
      status: 'Active' 
    }
  ];

  // Job Postings
  private jobPostings = [
    { 
      id: '1', 
      position_title: 'Senior Developer', 
      department_id: '3', 
      job_description: 'Looking for experienced developer', 
      qualifications: '5+ years experience', 
      salary_range: '50k-70k', 
      employment_type: 'Regular', 
      num_vacancies: 2, 
      application_deadline: new Date('2024-03-01'), 
      posting_status: 'Published', 
      created_by: '5', 
      created_at: new Date() 
    }
  ];

  // Job Applicants
  private jobApplicants = [
    { 
      id: '1', 
      first_name: 'John', 
      last_name: 'Doe', 
      email: 'john.doe@example.com', 
      phone: '09123456789', 
      current_employer: 'Tech Corp', 
      highest_education: 'BS Computer Science', 
      is_existing_employee: false, 
      application_date: new Date() 
    }
  ];

  // Job Applications
  private jobApplications = [
    { 
      id: '1', 
      position_id: '1', 
      applicant_id: '1', 
      cover_letter: 'I am interested in this position', 
      status: 'Pending', 
      application_date: new Date() 
    }
  ];

  // Application Documents
  private applicationDocuments = [
    { 
      id: '1', 
      application_id: '1', 
      document_type: 'Resume', 
      document_path: '/documents/resume.pdf', 
      upload_date: new Date() 
    }
  ];

  // Interview Schedules
  private interviewSchedules = [
    { 
      id: '1', 
      application_id: '1', 
      interviewer_id: '5', 
      interview_date: new Date('2024-02-15'), 
      interview_type: 'On_Site', 
      interview_status: 'Scheduled', 
      interview_location: 'Main Office' 
    }
  ];

  // Examination Schedules
  private examinationSchedules = [
    { 
      id: '1', 
      application_id: '1', 
      exam_type: 'Technical', 
      exam_date: new Date('2024-02-20'), 
      exam_location: 'Testing Center', 
      exam_status: 'Scheduled', 
      passing_score: 75 
    }
  ];

  // Applicant Assessments
  private applicantAssessments = [
    { 
      id: '1', 
      application_id: '1', 
      assessor_id: '5', 
      assessment_date: new Date(), 
      criteria_technical: 85, 
      criteria_experience: 90, 
      criteria_education: 80, 
      criteria_communication: 85, 
      criteria_cultural_fit: 90, 
      overall_rating: 86, 
      recommendation: 'Hire' 
    }
  ];

  // Certificate Requests
  private certificateRequests = [
    { 
      id: '1', 
      personnel_id: '1', 
      certificate_type: 'Employment', 
      purpose: 'Bank Loan', 
      status: 'Pending', 
      request_date: new Date() 
    }
  ];

  // Performance Reviews
  private performanceReviews = [
    { 
      id: '1', 
      personnel_id: '1', 
      reviewer_id: '2', 
      review_period_start: new Date('2023-01-01'), 
      review_period_end: new Date('2023-12-31'), 
      review_date: new Date(), 
      performance_score: 90, 
      strengths: 'Excellent technical skills', 
      areas_for_improvement: 'Time management', 
      goals: 'Complete certification', 
      status: 'Reviewed' 
    }
  ];

  // Training Programs
  private trainingPrograms = [
    { 
      id: '1', 
      training_name: 'Leadership Training', 
      description: 'Management skills development', 
      start_date: new Date('2024-03-01'), 
      end_date: new Date('2024-03-05'), 
      location: 'Training Center', 
      trainer: 'External Consultant', 
      max_participants: '20', 
      status: 'Planned', 
      created_by: '2', 
      created_at: new Date() 
    }
  ];

  // Training Modules
  private trainingModules = [
    { 
      id: '1', 
      training_id: '1', 
      module_name: 'Communication Skills', 
      content: 'Effective communication techniques', 
      video_link: 'https://example.com/video1' 
    }
  ];

  // Training Participants
  private trainingParticipants = [
    { 
      training_id: '1', 
      personnel_id: '1', 
      status: 'Enrolled', 
      enrollment_date: new Date() 
    }
  ];

  // Employee Feedback
  private employeeFeedback = [
    { 
      id: '1', 
      personnel_id: '1', 
      feedback_type: 'HR_Service', 
      feedback_content: 'Great HR support', 
      is_anonymous: false, 
      submitted_at: new Date(), 
      status: 'New' 
    }
  ];

  // Notifications
  private notifications = [
    { 
      id: '1', 
      user_id: '1', 
      notification_type: 'System', 
      message: 'Your leave request has been approved', 
      is_read: false, 
      created_at: new Date() 
    }
  ];

  // Documents
  private documents = [
    { 
      id: '1', 
      document_name: 'Company Policy', 
      document_type: 'PDF', 
      file_path: '/documents/policy.pdf', 
      uploaded_by: '1', 
      upload_date: new Date(), 
      is_public: true 
    }
  ];

  // Audit Logs
  private auditLogs = [
    {
      id: 1,
      timestamp: new Date('2024-05-15T10:45:23'),
      action: 'Payslip Generated',
      employee: {
        name: 'Juan Dela Cruz',
        id: 'EMP-2023-001'
      },
      details: 'May 2024 payslip generated with net pay of ₱46,250.00',
      performedBy: {
        name: 'Maria Santos',
        role: 'HR Manager'
      },
      ipAddress: '192.168.1.105'
    },
    {
      id: 2,
      timestamp: new Date('2024-05-14T15:22:17'),
      action: 'Salary Updated',
      employee: {
        name: 'Maria Santos',
        id: 'EMP-2023-002'
      },
      details: 'Basic salary updated from ₱48,000.00 to ₱50,000.00',
      performedBy: {
        name: 'Admin User',
        role: 'System Admin'
      },
      ipAddress: '192.168.1.100'
    },
    {
      id: 3,
      timestamp: new Date('2024-05-14T09:15:42'),
      action: 'Deduction Added',
      employee: {
        name: 'Pedro Reyes',
        id: 'EMP-2023-003'
      },
      details: 'Added SSS loan deduction of ₱1,200.00',
      performedBy: {
        name: 'Juan Dela Cruz',
        role: 'Payroll Officer'
      },
      ipAddress: '192.168.1.120'
    },
    {
      id: 4,
      timestamp: new Date('2024-05-13T11:30:05'),
      action: 'Bonus Added',
      employee: {
        name: 'All Employees',
        id: 'Company-wide'
      },
      details: 'Added performance bonus (5% of basic salary)',
      performedBy: {
        name: 'System',
        role: 'Automated Process'
      },
      ipAddress: 'System'
    },
    {
      id: 5,
      timestamp: new Date('2024-05-12T14:20:33'),
      action: 'Payslip Generated',
      employee: {
        name: 'Ana Garcia',
        id: 'EMP-2023-004'
      },
      details: 'May 2024 payslip generated with net pay of ₱42,500.00',
      performedBy: {
        name: 'Maria Santos',
        role: 'HR Manager'
      },
      ipAddress: '192.168.1.105'
    },
    {
      id: 6,
      timestamp: new Date('2024-05-12T09:45:12'),
      action: 'Salary Updated',
      employee: {
        name: 'Carlos Reyes',
        id: 'EMP-2023-005'
      },
      details: 'Basic salary updated from ₱45,000.00 to ₱47,000.00',
      performedBy: {
        name: 'Admin User',
        role: 'System Admin'
      },
      ipAddress: '192.168.1.100'
    },
    {
      id: 7,
      timestamp: new Date('2024-05-11T16:30:45'),
      action: 'Deduction Added',
      employee: {
        name: 'Maria Santos',
        id: 'EMP-2023-002'
      },
      details: 'Added HDMF loan deduction of ₱2,000.00',
      performedBy: {
        name: 'Juan Dela Cruz',
        role: 'Payroll Officer'
      },
      ipAddress: '192.168.1.120'
    },
    {
      id: 8,
      timestamp: new Date('2024-05-11T10:15:22'),
      action: 'Bonus Added',
      employee: {
        name: 'IT Department',
        id: 'DEPT-IT'
      },
      details: 'Added project completion bonus (10% of basic salary)',
      performedBy: {
        name: 'System',
        role: 'Automated Process'
      },
      ipAddress: 'System'
    }
  ];

  // Reports
  private reports = [
    { 
      id: '1', 
      report_name: 'Monthly Attendance', 
      generated_by: '1', 
      file_path: '/reports/attendance.pdf', 
      created_at: new Date() 
    }
  ];

  // Approvals
  private approvals = [
    { 
      id: '1', 
      request_type: 'Leave', 
      request_id: '1', 
      approval_step: 1, 
      status: 'Pending' 
    }
  ];

  // System Settings
  private systemSettings = [
    { 
      id: '1', 
      setting_key: 'company_name', 
      setting_value: 'Example Corp' 
    }
  ];

  // Performance Evaluations
  private performanceEvaluations = [
    { 
      id: '1', 
      personnel_id: '1', 
      reviewer_id: '2', 
      evaluation_period_start: new Date('2023-01-01'), 
      evaluation_period_end: new Date('2023-12-31'), 
      evaluation_date: new Date(), 
      kpi_score: 90, 
      overall_performance_score: 92, 
      status: 'Submitted' 
    }
  ];

  // System Modules
  private systemModules = [
    { 
      id: '1', 
      module_name: 'HR Management', 
      is_active: true, 
      can_be_disabled: false, 
      last_updated: new Date() 
    }
  ];

  // Employee Self Service Profiles
  private employeeSelfServiceProfiles = [
    { 
      id: '1', 
      personnelId: '1', 
      profilePicture: '/profiles/1.jpg', 
      bio: 'Experienced professional', 
      skills: ['JavaScript', 'Angular', 'Node.js'], 
      certifications: ['AWS Certified', 'Angular Certified'], 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ];

  // Education
  private education = [
    { 
      id: '1', 
      profileId: '1', 
      institution: 'University of Technology', 
      degree: 'Bachelor of Science', 
      fieldOfStudy: 'Computer Science', 
      startDate: new Date('2010-06-01'), 
      endDate: new Date('2014-05-31'), 
      isCurrent: false 
    }
  ];

  // Work Experience
  private workExperience = [
    { 
      id: '1', 
      profileId: '1', 
      company: 'Tech Solutions Inc', 
      position: 'Senior Developer', 
      startDate: new Date('2015-01-01'), 
      endDate: new Date('2019-12-31'), 
      isCurrent: false, 
      description: 'Led development team' 
    }
  ];

  // Employee Documents
  private employeeDocuments = [
    { 
      id: '1', 
      personnelId: '1', 
      title: 'Employment Contract', 
      description: 'Original employment contract', 
      fileUrl: '/documents/contract.pdf', 
      fileType: 'PDF', 
      fileSize: 1024, 
      category: 'Employment', 
      isPrivate: false, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ];

  // Courses
  private courses = [
    { 
      id: '1', 
      title: 'Advanced Angular Development', 
      description: 'Learn advanced Angular concepts', 
      objectives: ['Master Angular', 'Learn best practices'], 
      prerequisites: ['Basic Angular knowledge'], 
      duration: 40, 
      level: 'Advanced', 
      status: 'Published', 
      instructorId: '1', 
      category: 'Development', 
      tags: ['Angular', 'Frontend'], 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ];

  // Course Modules
  private courseModules = [
    { 
      id: '1', 
      courseId: '1', 
      title: 'Angular Fundamentals', 
      description: 'Core Angular concepts', 
      order: 1, 
      duration: 8, 
      content: 'Angular basics', 
      resources: ['/resources/angular-basics.pdf'], 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ];

  // Course Enrollments
  private courseEnrollments = [
    { 
      id: '1', 
      courseId: '1', 
      personnelId: '1', 
      enrollmentDate: new Date(), 
      status: 'ENROLLED', 
      progress: 0, 
      lastAccessedAt: new Date(), 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ];

  // Simulated Authentication Method
  login(email: string, password: string): Observable<any> {
    const user = this.users.find(u => u.email === email && u.password_hash === password);
    return user ? of({ success: true, user }) : of({ success: false, message: 'Invalid email or password' });
  }

  // Getter methods for all data
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  getPersonnel(): Observable<any[]> {
    return of(this.personnel);
  }

  getDepartments(): Observable<any[]> {
    return of(this.departments);
  }

  getEmploymentHistory(): Observable<any[]> {
    return of(this.employmentHistory);
  }

  getWorkSchedules(): Observable<any[]> {
    return of(this.workSchedules);
  }

  getPersonnelSchedules(): Observable<any[]> {
    return of(this.personnelSchedules);
  }

  getAttendanceLogs(): Observable<any[]> {
    return of(this.attendanceLogs);
  }

  getDtrAdjustmentRequests(): Observable<any[]> {
    return of(this.dtrAdjustmentRequests);
  }

  getLeaveTypes(): Observable<any[]> {
    return of(this.leaveTypes);
  }

  getLeaveBalances(): Observable<any[]> {
    return of(this.leaveBalances);
  }

  getLeaveApplications(): Observable<any[]> {
    return of(this.leaveApplications);
  }

  getLeaveMonetization(): Observable<any[]> {
    return of(this.leaveMonetization);
  }

  getOvertimeRequests(): Observable<any[]> {
    return of(this.overtimeRequests);
  }

  getPersonnelMovements(): Observable<any[]> {
    return of(this.personnelMovements);
  }

  getMeritViolations(): Observable<any[]> {
    return of(this.meritViolations);
  }

  getAdministrativeCases(): Observable<any[]> {
    return of(this.administrativeCases);
  }

  getPayrollRecords(): Observable<any[]> {
    return of(this.payrollRecords);
  }

  getDeductions(): Observable<any[]> {
    return of(this.deductions);
  }

  getLoanRecords(): Observable<any[]> {
    return of(this.loanRecords);
  }

  getJobPostings(): Observable<any[]> {
    return of(this.jobPostings);
  }

  getJobApplicants(): Observable<any[]> {
    return of(this.jobApplicants);
  }

  getJobApplications(): Observable<any[]> {
    return of(this.jobApplications);
  }

  getApplicationDocuments(): Observable<any[]> {
    return of(this.applicationDocuments);
  }

  getInterviewSchedules(): Observable<any[]> {
    return of(this.interviewSchedules);
  }

  getExaminationSchedules(): Observable<any[]> {
    return of(this.examinationSchedules);
  }

  getApplicantAssessments(): Observable<any[]> {
    return of(this.applicantAssessments);
  }

  getCertificateRequests(): Observable<any[]> {
    return of(this.certificateRequests);
  }

  getPerformanceReviews(): Observable<any[]> {
    return of(this.performanceReviews);
  }

  getTrainingPrograms(): Observable<any[]> {
    return of(this.trainingPrograms);
  }

  getTrainingModules(): Observable<any[]> {
    return of(this.trainingModules);
  }

  getTrainingParticipants(): Observable<any[]> {
    return of(this.trainingParticipants);
  }

  getEmployeeFeedback(): Observable<any[]> {
    return of(this.employeeFeedback);
  }

  getNotifications(): Observable<any[]> {
    return of(this.notifications);
  }

  getDocuments(): Observable<any[]> {
    return of(this.documents);
  }

  getAuditLogs(): Observable<any[]> {
    return of(this.auditLogs);
  }

  getReports(): Observable<any[]> {
    return of(this.reports);
  }

  getApprovals(): Observable<any[]> {
    return of(this.approvals);
  }

  getSystemSettings(): Observable<any[]> {
    return of(this.systemSettings);
  }

  getPerformanceEvaluations(): Observable<any[]> {
    return of(this.performanceEvaluations);
  }

  getSystemModules(): Observable<any[]> {
    return of(this.systemModules);
  }

  getEmployeeSelfServiceProfiles(): Observable<any[]> {
    return of(this.employeeSelfServiceProfiles);
  }

  getEducation(): Observable<any[]> {
    return of(this.education);
  }

  getWorkExperience(): Observable<any[]> {
    return of(this.workExperience);
  }

  getEmployeeDocuments(): Observable<any[]> {
    return of(this.employeeDocuments);
  }

  getCourses(): Observable<any[]> {
    return of(this.courses);
  }

  getCourseModules(): Observable<any[]> {
    return of(this.courseModules);
  }

  getCourseEnrollments(): Observable<any[]> {
    return of(this.courseEnrollments);
  }
}
