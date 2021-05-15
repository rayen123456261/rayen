import { Injectable } from '@angular/core';
import { Subvention } from '../models/subvention';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubventionService {

  constructor(private http: HttpClient) { }

  createSubvention(subvention: Subvention) {
    return this.http.post(`${environment.apiUrl}/subventions`, subvention);
  } 
  getSubventions(): Observable<Subvention[]> {
    return this.http.get<Subvention[]>(`${environment.apiUrl}/subventions`);
  }
  getSubvention(id: number): Observable<Subvention> {
    return this.http.get<Subvention>(`${environment.apiUrl}/subventions/${id}`);
  }
  deleteSubvention(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subventions/${id}`);
  }
  deleteSubventions(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subventions`);
  }
}
