import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmployeeComponent } from './add-employee.component';
import { FormsModule } from '@angular/forms';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddEmployeeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form values', () => {
    expect(component.newEmployee.username).toBe('');
    expect(component.newEmployee.email).toBe('');
    expect(component.newEmployee.password_hash).toBe('');
    expect(component.newEmployee.role).toBe('');
    expect(component.newEmployee.first_name).toBe('');
    expect(component.newEmployee.middle_name).toBe('');
    expect(component.newEmployee.last_name).toBe('');
    expect(component.newEmployee.suffix).toBe('');
    expect(component.newEmployee.date_of_birth).toBe('');
    expect(component.newEmployee.gender).toBe('');
    expect(component.newEmployee.civil_status).toBe('');
    expect(component.newEmployee.phone).toBe('');
    expect(component.newEmployee.address).toBe('');
    expect(component.newEmployee.designation).toBe('');
    expect(component.newEmployee.department).toBe('');
    expect(component.newEmployee.employment_type).toBe('');
    expect(component.newEmployee.date_hired).toBe('');
    expect(component.newEmployee.salary).toBe(0);
  });

  it('should have predefined roles, designations, and departments', () => {
    expect(component.roles).toContain('Admin');
    expect(component.roles).toContain('HR');
    expect(component.roles).toContain('Employee');
    expect(component.designations).toContain('System Administrator');
    expect(component.designations).toContain('HR Manager');
    expect(component.designations).toContain('Software Engineer');
    expect(component.departments).toContain('Admin');
    expect(component.departments).toContain('HR');
    expect(component.departments).toContain('IT');
  });

  it('should emit closeModal event when onClose is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onClose();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should reset form when onClose is called', () => {
    // Fill the form
    component.newEmployee = {
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'password',
      role: 'Admin',
      first_name: 'Test',
      middle_name: 'Middle',
      last_name: 'User',
      suffix: 'Jr',
      date_of_birth: '1990-01-01',
      gender: 'Male',
      civil_status: 'Single',
      phone: '1234567890',
      address: '123 Test St',
      designation: 'System Administrator',
      department: 'IT',
      employment_type: 'Full-time',
      date_hired: '2023-01-01',
      salary: 50000
    };

    component.onClose();

    // Check if form is reset
    expect(component.newEmployee.username).toBe('');
    expect(component.newEmployee.email).toBe('');
    expect(component.newEmployee.password_hash).toBe('');
    expect(component.newEmployee.role).toBe('');
    expect(component.newEmployee.first_name).toBe('');
    expect(component.newEmployee.middle_name).toBe('');
    expect(component.newEmployee.last_name).toBe('');
    expect(component.newEmployee.suffix).toBe('');
    expect(component.newEmployee.date_of_birth).toBe('');
    expect(component.newEmployee.gender).toBe('');
    expect(component.newEmployee.civil_status).toBe('');
    expect(component.newEmployee.phone).toBe('');
    expect(component.newEmployee.address).toBe('');
    expect(component.newEmployee.designation).toBe('');
    expect(component.newEmployee.department).toBe('');
    expect(component.newEmployee.employment_type).toBe('');
    expect(component.newEmployee.date_hired).toBe('');
    expect(component.newEmployee.salary).toBe(0);
  });

  it('should validate form correctly', () => {
    // Empty form should be invalid
    expect(component.validateForm()).toBeFalse();

    // Partially filled form should be invalid
    component.newEmployee.username = 'testuser';
    expect(component.validateForm()).toBeFalse();

    // Fully filled form should be valid
    component.newEmployee = {
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'password',
      role: 'Admin',
      first_name: 'Test',
      middle_name: 'Middle',
      last_name: 'User',
      suffix: 'Jr',
      date_of_birth: '1990-01-01',
      gender: 'Male',
      civil_status: 'Single',
      phone: '1234567890',
      address: '123 Test St',
      designation: 'System Administrator',
      department: 'IT',
      employment_type: 'Full-time',
      date_hired: '2023-01-01',
      salary: 50000
    };
    expect(component.validateForm()).toBeTrue();
  });

  it('should emit submitEmployee event with form data when form is valid', () => {
    spyOn(component.submitEmployee, 'emit');
    
    // Fill the form with valid data
    component.newEmployee = {
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'password',
      role: 'Admin',
      first_name: 'Test',
      middle_name: 'Middle',
      last_name: 'User',
      suffix: 'Jr',
      date_of_birth: '1990-01-01',
      gender: 'Male',
      civil_status: 'Single',
      phone: '1234567890',
      address: '123 Test St',
      designation: 'System Administrator',
      department: 'IT',
      employment_type: 'Full-time',
      date_hired: '2023-01-01',
      salary: 50000
    };

    component.onSubmit();

    expect(component.submitEmployee.emit).toHaveBeenCalledWith(component.newEmployee);
  });

  it('should not emit submitEmployee event when form is invalid', () => {
    spyOn(component.submitEmployee, 'emit');
    spyOn(window, 'alert');

    // Submit with empty form
    component.onSubmit();

    expect(component.submitEmployee.emit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields');
  });

  it('should reset form after successful submission', () => {
    // Fill the form with valid data
    component.newEmployee = {
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'password',
      role: 'Admin',
      first_name: 'Test',
      middle_name: 'Middle',
      last_name: 'User',
      suffix: 'Jr',
      date_of_birth: '1990-01-01',
      gender: 'Male',
      civil_status: 'Single',
      phone: '1234567890',
      address: '123 Test St',
      designation: 'System Administrator',
      department: 'IT',
      employment_type: 'Full-time',
      date_hired: '2023-01-01',
      salary: 50000
    };

    component.onSubmit();

    // Check if form is reset
    expect(component.newEmployee.username).toBe('');
    expect(component.newEmployee.email).toBe('');
    expect(component.newEmployee.password_hash).toBe('');
    expect(component.newEmployee.role).toBe('');
    expect(component.newEmployee.first_name).toBe('');
    expect(component.newEmployee.middle_name).toBe('');
    expect(component.newEmployee.last_name).toBe('');
    expect(component.newEmployee.suffix).toBe('');
    expect(component.newEmployee.date_of_birth).toBe('');
    expect(component.newEmployee.gender).toBe('');
    expect(component.newEmployee.civil_status).toBe('');
    expect(component.newEmployee.phone).toBe('');
    expect(component.newEmployee.address).toBe('');
    expect(component.newEmployee.designation).toBe('');
    expect(component.newEmployee.department).toBe('');
    expect(component.newEmployee.employment_type).toBe('');
    expect(component.newEmployee.date_hired).toBe('');
    expect(component.newEmployee.salary).toBe(0);
  });
}); 