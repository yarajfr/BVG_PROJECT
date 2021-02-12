import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = localStorage.getItem('userData') ? true : false;
  constructor() { }
  public loginStatus: Subject<boolean> = new BehaviorSubject<boolean>(this.loggedIn);

  updateStatus(status: boolean): void {
    console.log('updateData');
    this.loggedIn = status;
    this.loginStatus.next(this.loggedIn);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserDetails(): any {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  }

  setDataInLocalStorage(variableName, data): any {
    localStorage.setItem(variableName, data);
    console.log(variableName);
    console.log(data);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getPersonalNr(): any {
    return localStorage.getItem('personalnr');
  }

  clearStorage(): any {
    localStorage.clear();
  }
}
/*


  setDataInLocalStorage(variableName, data): any {
    localStorage.setItem(variableName, data);
  }

  clearStorage(): any {
    localStorage.clear();
  }
}
*/
