import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL} from '../../util';
import {CreditCard} from '../models/creditcard';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CreditCardService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Array<CreditCard>>( BACKEND_URL + '/creditcard/getall', httpOptions );
  }

  saveCarta(card:CreditCard){
    return this.http.post( BACKEND_URL + '/creditcard/saveupdate',card , httpOptions );
  }


}
