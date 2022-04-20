import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  minion = true;
  doc = false;
  gru = false;

  constructor(private authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe((data) =>{
    });
  }

}
