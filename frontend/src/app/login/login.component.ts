import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../shared/backend.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bvg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = false;
  errorMessage: string;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cs: BackendService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      personalnr: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.isUserLogin();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    // console.log('Your form data : ', this.loginForm.value);
    this.cs.login(this.loginForm.value).subscribe((res: any) => {
      if (res.status && res.data.length > 0) {
        console.log('in login - response');
        console.log(res);
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.auth.setDataInLocalStorage('token', res.token);
        this.auth.setDataInLocalStorage('personalnr', res.data[0].PersonalNr);
        this.auth.updateStatus(true);
        console.log('----- personalnr -------');
        console.log(this.auth.getPersonalNr());
        console.log('----- personalnr -------');
        this.isLogin = true;
        this.router.navigate(['']);
      } else {
        console.log('Personal-Nr und Passwort stimmen nicht überein!');
        this.errorMessage = 'Personal-Nr und Passwort stimmen nicht überein!';
        this.loginForm.controls.personalnr.setErrors({errors: true});
        this.loginForm.controls.password.setErrors({errors: true});
        this.isLogin = false;
        this.auth.updateStatus(false);
      }
    }, err => {
      this.isLogin = false;
      this.auth.updateStatus(false);
      this.errorMessage = err.error.message;
    });
  }

}

