import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PayrollRecord {
  id: string;
  personnel_id: string;
  payroll_period_start: Date;
  payroll_period_end: Date;
  basic_salary: number;
  salary_adjustments: number;
  gross_salary: number;
  total_deductions: number;
  net_amount_due: number;
  payment_status: string;
  bank_account_number?: string;
  processed_date: Date;
  processed_by?: string;
  deductions: Deduction[];
}

export interface Deduction {
  id: string;
  personnel_id: string;
  payroll_id: string;
  bir: number;
  pagibig: number;
  philhealth: number;
  sss: number;
  loans: number;
  other_deductions: number;
}

export interface CreatePayrollRecordDto {
  personnel_id: string;
  payroll_period_start: Date;
  payroll_period_end: Date;
  basic_salary: number;
  salary_adjustments?: number;
  bank_account_number?: string;
}

export interface UpdatePayrollRecordDto {
  basic_salary?: number;
  salary_adjustments?: number;
  bank_account_number?: string;
  payment_status?: string;
}

export interface Department {
  id: string;
  department_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = `${environment.apiUrl}/payroll`;

  constructor(private http: HttpClient) {}

  getAllPayrollRecords(): Observable<PayrollRecord[]> {
    return this.http.get<PayrollRecord[]>(`${this.apiUrl}/records`);
  }

  getPayrollRecordById(id: string): Observable<PayrollRecord> {
    return this.http.get<PayrollRecord>(`${this.apiUrl}/records/${id}`);
  }

  getPayrollRecordsByPersonnel(personnelId: string): Observable<PayrollRecord[]> {
    return this.http.get<PayrollRecord[]>(`${this.apiUrl}/records/personnel/${personnelId}`);
  }

  createPayrollRecord(data: CreatePayrollRecordDto): Observable<PayrollRecord> {
    return this.http.post<PayrollRecord>(`${this.apiUrl}/records`, data);
  }

  updatePayrollRecord(id: string, data: UpdatePayrollRecordDto): Observable<PayrollRecord> {
    return this.http.patch<PayrollRecord>(`${this.apiUrl}/records/${id}`, data);
  }

  createDeduction(data: any): Observable<Deduction> {
    return this.http.post<Deduction>(`${this.apiUrl}/deductions`, data);
  }

  updateDeduction(id: string, data: any): Observable<Deduction> {
    return this.http.patch<Deduction>(`${this.apiUrl}/deductions/${id}`, data);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`);
  }
} 