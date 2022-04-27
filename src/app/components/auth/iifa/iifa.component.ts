import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Ws from '@adonisjs/websocket-client'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-iifa',
  templateUrl: './iifa.component.html',
  styleUrls: ['./iifa.component.css']
})
export class IIFAComponent implements OnInit {
  authForm: FormGroup;
  qrInfo: any;
  showQr = false;
  response: any;
  ws: any;
  chat: any;
  message = 'Puedo pasar? 🥺';
  ip: string = "hola";

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private dialogref: MatDialogRef<IIFAComponent>,
    private http: HttpClient) { 
    this.buildForm();
    this.qrInfo = JSON.stringify(this.user);
  }

  ngOnInit(): void {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      console.log(res);
      this.ip = res.ip;
    });
    console.log(this.user);
    if(this.user.rol == '3'){
      this.showQr = true;
    }
  }
  puedoPasar(): void {
    this.chat.emit('message', {message: this.message,
    email: this.user.email});
  }
  setUser(): void{
    this.user.code = this.authForm.get('code').value;
    console.log(this.user);
    this.auth2(this.user);
  }
  auth2(user: User): void {
    this.authService.auth2(user).subscribe((data) => {
    this.response = data;
    if(this.response.token){
      if(this.user.rol == '3'){
        this.ws = Ws('ws://localhost:3333', {
        path: 'ws'
        });
        this.ws.connect();
        this.chat = this.ws.subscribe('chat');
        this.puedoPasar();
        this.chat.on('message', (data) => {
          if(data.message == 'chi 🥺' && this.user.email == data.email){
            this.ws.close();
            this.authService.storageToken(this.response.token);
            this.router.navigate(['/home']);
            this.dialogref.close();
          }
        });
      }else{
        this.authService.storageToken(this.response.token);
        this.router.navigate(['/home']);
        this.dialogref.close();
      }
    }
    });
  }
  buildForm(): void {
    this.authForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(10)
      ]]
    });
  }

}
