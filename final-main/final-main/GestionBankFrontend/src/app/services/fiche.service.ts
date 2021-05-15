import { Injectable } from '@angular/core';
import { Fiche } from '../models/Fiche';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FicheService {



  constructor(private http: HttpClient) { }

  createFiche(fiche: Fiche) {
    return this.http.post(`${environment.apiUrl}/fiches`, fiche);
  }
  getFiches(userid : number): Observable<Fiche[]> {
    return this.http.get<Fiche[]>(`${environment.apiUrl}/fiches/myfiche/${userid}`);
  }


 getFichee(): Observable<Fiche[]> {
  return this.http.get<Fiche[]>(`${environment.apiUrl}/fiches`);
 }

  getFiche(id: number): Observable<Fiche> {
    return this.http.get<Fiche>(`${environment.apiUrl}/fiches/${id}`);
  }
  getcalcul(id: number) {
    return this.http.get(`${environment.apiUrl}/calcul/${id}`);
  }
  getcalculs() {
    return this.http.get(`${environment.apiUrl}/calcul/rayen`);
  }
  deleteFiche(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/fiches/${id}`);
  }
  deleteFiches(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/fiches`);
  }
  updateFiche(id: number, fiche: Fiche): Observable<any> {
    return this.http.put(`${environment.apiUrl}/fiches/${id}`, fiche);
  }
}
