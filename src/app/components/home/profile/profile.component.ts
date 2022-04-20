import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  tokenForm: FormGroup;
  user: User;
  roles: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.authService.verifyToken();
    this.userService.getUserData().subscribe((data) => {
      this.user = data.user;
      this.setFormData(this.user);
    });
  }

  buildForm(): void{
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
      rol: ['']
    });
    this.tokenForm = this.fb.group({
      token: ['']
    });
    this.roles = [
      {'id': '1', 'name': 'Minion'},
      {'id': '2', 'name': 'Doc'},
      {'id': '3', 'name': 'Gru'}
    ]
  }

  setFormData(user: User): void{
    console.log(user);
    this.profileForm.patchValue(user);
  }

  generateToken(): void {
    this.userService.generateToken().subscribe((data) =>{
      this.tokenForm.get('token').setValue(data.token)
    });
  }

}
