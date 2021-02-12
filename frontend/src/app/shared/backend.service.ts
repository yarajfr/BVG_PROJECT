import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from "rxjs";
import {Data} from "./data";
import{Busdaten} from "./busdaten";
import {UserLogin} from './userlogin';
import {UserRegister} from './userregister';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Busdaten[]>{
    return this.http.get<Busdaten[]>(this.baseUrl + '/all');
  }
  login(user: UserLogin): Observable<UserRegister> {
    return this.http.post<any>(this.baseUrl + '/user/login', user);
  }

  getBussePruefer(prueferNr: string): Observable<Busdaten[]>{
    return this.http.get<Busdaten[]>(this.baseUrl + '/all/' + prueferNr);
  }

  setPrueferBus(prueferNr: string, bus: { BusNr: number }): Observable<any>{
    return this.http.put<any>(this.baseUrl + '/bus/' + prueferNr, bus);
  }

}
