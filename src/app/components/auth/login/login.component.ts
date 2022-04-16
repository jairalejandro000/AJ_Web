import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  hide = true;

  constructor(private fb: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit(): void {
    console.log("aqui ando");
  }

  buildForm(): void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  logIn(){
    this.user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    console.log(this.user);
  }

}
