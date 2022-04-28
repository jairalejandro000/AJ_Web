import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  public _userInfo$ = new Subject<any>();

  constructor(private http: HttpClient,
    private cookies: CookieService) { }

  public getUserInfo(): Observable<User> {
    return this._userInfo$.asObservable();
  }
  public setUserInfo(user: User): void {
    this._userInfo$.next(user);
  }
  auth1(user: User){
    return this.http.post(`${this.apiUrl}Auth/auth1`, user);
  }
  auth2(user: User){
    return this.http.post(`${this.apiUrl}Auth/auth2`, user);
  }
  authVPN(user: User){
    return this.http.post(`${this.apiUrl}Auth/loginVPN`, user);
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
