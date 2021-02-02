import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserDetails(): any {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  }
}
