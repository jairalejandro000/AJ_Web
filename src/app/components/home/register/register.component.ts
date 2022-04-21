import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, successDialog } from 'src/app/functions/alerts';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  response: any;
  
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
  setUser(): void {
    this.user = {
      name: this.registerForm.get('name').value,
      lastname: this.registerForm.get('lastname').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      rol: 1
    }
    this.register(this.user);
    console.log(this.user);
  }
  register(user: User): void {
    console.log(user);
    this.userService.register(user).subscribe((data) => {
      this.response = data;
      console.log(this.response);
      successDialog(this.response.message).then(() => {
        this.router.navigate(['/Auth/login']);
      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
      errorMessage(error.error.message);
    });
  } 
  checkPassword(): void{
    console.log("pruebaaa");
    if(this.registerForm.get('confirmpassword').value !=
      this.registerForm.get('password').value){
        this.registerForm.get('confirmpassword').setErrors({ mismatch: true });
    }else{
      this.registerForm.get('confirmpassword').setErrors(null);
    }
  }
  buildForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]],
      email: ['', [
        Validators.required, 
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.minLength(15), 
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10)
      ]],
      confirmpassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10)
      ]],
    });
  }
}
