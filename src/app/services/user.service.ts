import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
}