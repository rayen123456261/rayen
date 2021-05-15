import { Injectable } from '@angular/core';
import { Grade } from '../models/grade';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) { }

  createGrade(grade: Grade) {
    return this.http.post(`${environment.apiUrl}/grades`, grade);
  }
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${environment.apiUrl}/grades`);
  }
  getGrade(id: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${environment.apiUrl}/grades/corps/${id}`);
  }
  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/grades/${id}`);
  }
  deleteGrades(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/grades`);
  }
}
