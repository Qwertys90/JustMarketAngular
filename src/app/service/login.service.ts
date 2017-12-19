import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BACKEND_URL} from "../../util";
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(user){
    return this.http.post(BACKEND_URL + '/login', user, httpOptions);
  }

  register(user){
    return this.http.post(BACKEND_URL + '/register', user, httpOptions);
  }

  modifica(user){
    return this.http.post(BACKEND_URL + '/modifica', user, httpOptions);
  }

  logout(){
    return this.http.get(BACKEND_URL + '/logoutApp', {responseType: 'text'});
  }

  dettagli(){
    return this.http.get<User>( BACKEND_URL + '/userdetails', httpOptions );
  }

  isLog(){
    return this.http.get( BACKEND_URL + '/islogged', httpOptions );
  }

}
