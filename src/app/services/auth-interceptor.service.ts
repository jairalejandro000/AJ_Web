import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { errorMessage } from '../functions/alerts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private authService: AuthService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if(token){
      const reqClone = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(reqClone).pipe(
          catchError((error: HttpErrorResponse) => throwError(this.handleError(error))));
    }else{
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => throwError(this.handleError(error))));
      }
    }
    handleError(error: HttpErrorResponse){
      if(error.status == 401){
        this.authService.clearCookies();
        this.router.navigate(['/Login']);
      }
    }
}
