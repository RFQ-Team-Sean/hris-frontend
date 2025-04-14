import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  constructor(private http: HttpClient) {}

  // Generic methods for CRUD operations
  getAll(endpoint: string, params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(endpoint, { params });
  }

  getById(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${endpoint}/${id}`);
  }

  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(endpoint, data);
  }

  update(endpoint: string, id: string | number, data: T): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: string | number): Observable<void> {
    return this.http.delete<void>(`${endpoint}/${id}`);
  }

  // Generic methods for filtering and pagination
  search(endpoint: string, query: string, params?: HttpParams): Observable<T[]> {
    const searchParams = params || new HttpParams();
    return this.http.get<T[]>(`${endpoint}/search`, { 
      params: searchParams.set('query', query)
    });
  }

  getPaginated(endpoint: string, page: number, pageSize: number, params?: HttpParams): Observable<{ data: T[]; total: number }> {
    const paginationParams = params || new HttpParams();
    return this.http.get<{ data: T[]; total: number }>(endpoint, {
      params: paginationParams
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  // Generic method for batch operations
  batchCreate(endpoint: string, data: T[]): Observable<T[]> {
    return this.http.post<T[]>(`${endpoint}/batch`, data);
  }

  batchUpdate(endpoint: string, data: T[]): Observable<T[]> {
    return this.http.put<T[]>(`${endpoint}/batch`, data);
  }

  batchDelete(endpoint: string, ids: (string | number)[]): Observable<void> {
    return this.http.post<void>(`${endpoint}/batch-delete`, { ids });
  }

  // Generic method for file upload
  uploadFile(endpoint: string, file: File, additionalData?: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }
    return this.http.post<any>(`${endpoint}/upload`, formData);
  }

  // Generic method for export
  export(endpoint: string, format: string, params?: HttpParams): Observable<Blob> {
    const exportParams = params || new HttpParams();
    return this.http.get(`${endpoint}/export`, {
      params: exportParams.set('format', format),
      responseType: 'blob'
    });
  }
} 