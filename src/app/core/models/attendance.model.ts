export interface AttendanceLog {
  id: string;
  personnel_id: string;
  log_date: Date;
  time_in: Date | null;
  time_out: Date | null;
  total_hours: number | null;
  status: 'Present' | 'Absent' | 'Late' | 'On_Leave' | 'Work_From_Home';
  biometric_used: boolean;
  evidence_path?: string;
}

export interface DtrAdjustmentRequest {
  id: string;
  personnel_id: string;
  log_date: Date;
  original_time_in: Date | null;
  original_time_out: Date | null;
  requested_time_in: Date | null;
  requested_time_out: Date | null;
  reason: string;
  supporting_document?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  request_date: Date;
  approved_by?: string;
  approval_date?: Date;
}

export interface WorkSchedule {
  id: string;
  schedule_name: string;
  is_flextime: boolean;
  start_time: Date | null;
  end_time: Date | null;
  break_start_time: Date | null;
  break_end_time: Date | null;
  break_deducted: boolean;
  is_work_from_home: boolean;
  created_at: Date;
}

export interface PersonnelSchedule {
  id: string;
  personnel_id: string;
  schedule_id: string;
  start_date: Date;
  end_date: Date | null;
  created_by: string;
  created_at: Date;
}

export interface OvertimeRequest {
  id: string;
  personnel_id: string;
  overtime_date: Date;
  start_time: Date;
  end_time: Date;
  total_hours: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  request_date: Date;
  approved_by?: string;
  approval_date?: Date;
}

export interface AttendanceSummary {
  personnel_id: string;
  date: Date;
  total_present: number;
  total_absent: number;
  total_late: number;
  total_work_from_home: number;
  total_on_leave: number;
  total_hours_worked: number;
  total_overtime_hours: number;
}

export interface AttendanceReport {
  id: string;
  report_name: string;
  generated_by: string;
  file_path: string;
  digital_signature?: string;
  created_at: Date;
}

export interface AttendanceSettings {
  id: string;
  setting_key: string;
  setting_value: string;
  description?: string;
  last_updated: Date;
} 