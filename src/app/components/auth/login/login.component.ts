import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { errorMessage, successDialog } from 'src/app/functions/alerts';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IIFAComponent } from 'src/app/components/auth/iifa/iifa.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  hide = true;
  response: any;
  rol: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(() => {  
      this.router.navigate(['/home']);
    });
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      console.log(res);
    });
  }

  buildForm(): void{
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.minLength(15), 
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(20)
      ]]
    });
  }

  setUser(): void{
    this.user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.auth1(this.user);
  }
  auth1(user: User){
    console.log(user);
    this.authService.authVPN(user).subscribe((data) => {
      this.response = data;
      console.log(this.response);
      if(this.response.token){
        this.authService.storageToken(this.response.token);
        this.router.navigate(['/home']);
      }
      if(this.response.rol != '1'){
        this.authService.setUserInfo(this.user);
        this.dialog.open(IIFAComponent, {
          width: '700px',
          data : {
            'email': this.user.email,
            'password': this.user.password,
            'rol': this.response.rol
          }
        });
      }
      successDialog(this.response.message);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      errorMessage(error.error.message);
    });
  }
}
