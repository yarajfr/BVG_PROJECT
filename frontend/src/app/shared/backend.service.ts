import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Data} from "./data";
import{ Busdata} from "./busdata";


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(this.baseUrl+'/all');
  }

  getBus(): Observable<Busdata[]> {
    return this.http.get<Busdata[]>(this.baseUrl+'/busdaten');
  }
}
