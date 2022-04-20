import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { errorMessage, successDialog } from 'src/app/functions/alerts';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe(() => {  
      this.router.navigate(['/home']);
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
    this.authService.auth1(user).subscribe((data) => {
      this.response = data;
      var redirecto = 'home';
      if(this.response.token){
        this.authService.storageToken(this.response.token);
      }
      if(this.response.rol != 1){
        redirecto = 'Login/2auth';
      }
      successDialog(this.response.message).then(() => {
        this.router.navigate([`/${redirecto}`]);
      })
    }, (error: HttpErrorResponse)=>{
      errorMessage(error.error.message);
    });
  }
}
