import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/all`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
  deleteUsers(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users`);
  }
}
