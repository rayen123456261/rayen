import { Injectable } from '@angular/core';
import { Affectation } from '../models/affectation';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http: HttpClient) { }

  createAffecation(affecttion: Affectation) {
    return this.http.post(`${environment.apiUrl}/affectations`, affecttion);
  } 
  getAffectations(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(`${environment.apiUrl}/affectations`);
  }
  getAffectation(id: number): Observable<Affectation> {
    return this.http.get<Affectation>(`${environment.apiUrl}/affectations/${id}`);
  }
  deleteAffectation(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/affectations/${id}`);
  }
  deleteAffectations(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/affectations`);
  }
}

