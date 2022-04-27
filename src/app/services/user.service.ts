import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Serie } from '../models/serie';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any>{
    return this.http.get(`${this.apiUrl}User/show`);
  }
  getSeries(): Observable<any>{
    return this.http.get(`${this.apiUrl}Serie/showSeries`);
  }
  generateToken(): Observable<any>{
    return this.http.get(`${this.apiUrl}User/generateToken`);
  }
  register(user: User) {
    return this.http.post(`${this.apiUrl}User/create`, user);
  }
  addSerie(serie: Serie) {
    return this.http.post(`${this.apiUrl}Serie/create`, serie);
  }
  updateSerie(serie: Serie, id: number) {
    return this.http.put(`${this.apiUrl}Serie/update/${id}`, serie);
  }
}
