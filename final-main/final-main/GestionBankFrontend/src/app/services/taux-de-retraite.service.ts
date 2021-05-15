import { Injectable } from '@angular/core';
import { TauxDeRetraite } from '../models/TauxDeRetraite';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TauxDeRetraiteService {

  constructor(private http: HttpClient) { }

  createTauxDeRetraite(tauxDeRetraite: TauxDeRetraite) {

    return this.http.post(`${environment.apiUrl}/tauxDeRetraite`, tauxDeRetraite);
  }
  getTauxDeRetraites(): Observable<TauxDeRetraite[]> {
    return this.http.get<TauxDeRetraite[]>(`${environment.apiUrl}/tauxDeRetraite`);
  }
  deleteTauxDeRetraite(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/tauxDeRetraite/${id}`);
  }
}
