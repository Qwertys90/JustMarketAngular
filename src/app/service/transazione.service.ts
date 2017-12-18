import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transazione} from '../models/transazione';
import {BACKEND_URL} from '../../util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TransazioneService {

  constructor(
    private http:HttpClient
  ) { }

  saveTransaction(transaction:Transazione, id:number){
    return this.http.post(BACKEND_URL + '/transazione/buy/'+id, transaction, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });

  }

}
