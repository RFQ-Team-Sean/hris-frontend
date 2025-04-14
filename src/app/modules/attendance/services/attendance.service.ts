import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Observable } from 'rxjs';
import { 
  AttendanceLog, 
  DtrAdjustmentRequest, 
  WorkSchedule, 
  PersonnelSchedule,
  OvertimeRequest,
  AttendanceSummary,
  AttendanceReport,
  AttendanceSettings
} from '../../../core/models/attendance.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends CrudService<AttendanceLog> {
  private readonly baseEndpoint = '/api/attendance';

  // Attendance Log Methods
  getTodayAttendance(): Observable<AttendanceLog[]> {
    return this.getAll(`${this.baseEndpoint}/today`);
  }

  getEmployeeAttendance(employeeId: string, startDate: string, endDate: string): Observable<AttendanceLog[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.getAll(`${this.baseEndpoint}/employee/${employeeId}`, params);
  }

  getDepartmentAttendance(departmentId: string, date: string): Observable<AttendanceLog[]> {
    return this.getAll(`${this.baseEndpoint}/department/${departmentId}`, new HttpParams().set('date', date));
  }

  // DTR Adjustment Methods
  getDtrAdjustments(params?: HttpParams): Observable<DtrAdjustmentRequest[]> {
    return this.http.get<DtrAdjustmentRequest[]>(`${this.baseEndpoint}/adjustments`, { params });
  }

  createDtrAdjustment(data: DtrAdjustmentRequest): Observable<DtrAdjustmentRequest> {
    return this.http.post<DtrAdjustmentRequest>(`${this.baseEndpoint}/adjustments`, data);
  }

  updateDtrAdjustment(id: string, data: DtrAdjustmentRequest): Observable<DtrAdjustmentRequest> {
    return this.http.put<DtrAdjustmentRequest>(`${this.baseEndpoint}/adjustments/${id}`, data);
  }

  // Work Schedule Methods
  getWorkSchedules(params?: HttpParams): Observable<WorkSchedule[]> {
    return this.http.get<WorkSchedule[]>(`${this.baseEndpoint}/schedules`, { params });
  }

  createWorkSchedule(data: WorkSchedule): Observable<WorkSchedule> {
    return this.http.post<WorkSchedule>(`${this.baseEndpoint}/schedules`, data);
  }

  // Personnel Schedule Methods
  getPersonnelSchedules(params?: HttpParams): Observable<PersonnelSchedule[]> {
    return this.http.get<PersonnelSchedule[]>(`${this.baseEndpoint}/personnel-schedules`, { params });
  }

  assignSchedule(data: PersonnelSchedule): Observable<PersonnelSchedule> {
    return this.http.post<PersonnelSchedule>(`${this.baseEndpoint}/personnel-schedules`, data);
  }

  // Overtime Methods
  getOvertimeRequests(params?: HttpParams): Observable<OvertimeRequest[]> {
    return this.http.get<OvertimeRequest[]>(`${this.baseEndpoint}/overtime`, { params });
  }

  createOvertimeRequest(data: OvertimeRequest): Observable<OvertimeRequest> {
    return this.http.post<OvertimeRequest>(`${this.baseEndpoint}/overtime`, data);
  }

  // Summary Methods
  getAttendanceSummary(personnelId: string, startDate: string, endDate: string): Observable<AttendanceSummary> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<AttendanceSummary>(`${this.baseEndpoint}/summary/${personnelId}`, { params });
  }

  // Report Methods
  generateAttendanceReport(params?: HttpParams): Observable<AttendanceReport> {
    return this.http.post<AttendanceReport>(`${this.baseEndpoint}/reports/generate`, null, { params });
  }

  getAttendanceReports(params?: HttpParams): Observable<AttendanceReport[]> {
    return this.http.get<AttendanceReport[]>(`${this.baseEndpoint}/reports`, { params });
  }

  // Settings Methods
  getAttendanceSettings(): Observable<AttendanceSettings[]> {
    return this.http.get<AttendanceSettings[]>(`${this.baseEndpoint}/settings`);
  }

  updateAttendanceSetting(id: string, data: AttendanceSettings): Observable<AttendanceSettings> {
    return this.http.put<AttendanceSettings>(`${this.baseEndpoint}/settings/${id}`, data);
  }

  // Override generic methods with specific endpoints
  override getAll(params?: HttpParams): Observable<AttendanceLog[]> {
    return super.getAll(this.baseEndpoint, params);
  }

  override getById(id: string): Observable<AttendanceLog> {
    return super.getById(this.baseEndpoint, id);
  }

  override create(data: AttendanceLog): Observable<AttendanceLog> {
    return super.create(this.baseEndpoint, data);
  }

  override update(id: string, data: AttendanceLog): Observable<AttendanceLog> {
    return super.update(this.baseEndpoint, id, data);
  }

  override delete(id: string): Observable<void> {
    return super.delete(this.baseEndpoint, id);
  }
}
