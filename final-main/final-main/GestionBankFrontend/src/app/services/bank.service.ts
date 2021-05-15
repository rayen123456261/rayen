import { Injectable } from '@angular/core';
import { Bank } from '../models/bank';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(private http: HttpClient) { }

  createBank(bank: Bank) {
    return this.http.post(`${environment.apiUrl}/bank/`, bank);
  } 
  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${environment.apiUrl}/bank`);
  }
  getBank(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${environment.apiUrl}/bank/${id}`);
  }
  deleteBank(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/bank/${id}`);
  }
  deleteBanks(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/bank`);
  }
}
