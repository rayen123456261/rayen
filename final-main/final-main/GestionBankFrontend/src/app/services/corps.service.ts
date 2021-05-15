import { Injectable } from '@angular/core';
import { Corps } from '../models/Corps';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CorpsService {

  constructor(private http: HttpClient) { }

  createCorps(corps: Corps) {

    return this.http.post(`${environment.apiUrl}/corps/`, corps);
  }
  getCorpss(): Observable<Corps[]> {
    return this.http.get<Corps[]>(`${environment.apiUrl}/corps`);
  }
  getCorps(id: number): Observable<Corps> {
    return this.http.get<Corps>(`${environment.apiUrl}/corps/${id}`);
  }
  deleteCorps(id: number): Observable<any> {
    console.log(id);
    return this.http.delete(`${environment.apiUrl}/corps/${id}`);
  }
  deleteCorpss(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/corps`);
  }
}
