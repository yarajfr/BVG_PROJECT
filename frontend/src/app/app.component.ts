import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'bvg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService,
              private router: Router) { }

  title = 'frontend';
  isLogin = false;
  personalNr = '';
  changed = this.auth.loginStatus.subscribe(next => {
    this.ngOnInit();
  });

  ngOnInit(): void {
    this.isUserLogin();
  }

  isUserLogin(): void{
    if (this.auth.isLoggedIn()){
      this.isLogin = true;
      this.personalNr = this.auth.getPersonalNr();
    }
    else {
      this.isLogin = false;
      this.personalNr = '';
    }
  }

  logout(): void{
    console.log('logged out');
    this.auth.clearStorage();
    this.auth.updateStatus(false);
    this.router.navigate(['']);
  }
}


