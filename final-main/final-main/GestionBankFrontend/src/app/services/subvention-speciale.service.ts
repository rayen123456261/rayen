import { Injectable } from '@angular/core';
import { SubventionSpeciale } from '../models/subventionSpeciale';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubventionSpecialeService {

  constructor(private http: HttpClient) { }

  createSubventionSpeciale(subventionSpeciale: SubventionSpeciale) {
    return this.http.post(`${environment.apiUrl}/subventionSpeciales`, subventionSpeciale);
  } 
  getSubventionSpeciales(): Observable<SubventionSpeciale[]> {
    return this.http.get<SubventionSpeciale[]>(`${environment.apiUrl}/subventionSpeciales`);
  }
  getSubventionSpeciale(id: number): Observable<SubventionSpeciale> {
    return this.http.get<SubventionSpeciale>(`${environment.apiUrl}/subventionSpeciales/${id}`);
  }
  deleteSubventionSpeciale(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subventionSpeciales/${id}`);
  }
  deleteSubventionSpeciales(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subventionSpeciales`);
  }
}
