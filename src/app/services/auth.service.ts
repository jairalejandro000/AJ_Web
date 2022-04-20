import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private cookies: CookieService) { }

  auth1(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}Auth/auth1`, user);
  }
  storageToken(token){
    this.cookies.set('token', token);
  }
  verifyToken(){
    return this.http.get(`${this.apiUrl}User/verifyToken`);
  }
  getToken(){
    const token = this.cookies.get('token');
    return token;
  }
  clearCookies(){
    this.cookies.delete('token');
  }
}
