import {Component, OnInit} from '@angular/core';
import {Prodotto} from '../models/prodotto';
import {SharedService} from '../service/shared.service';
import {Transazione} from '../models/transazione';
import {CreditCard} from '../models/creditcard';
import {LoginService} from '../service/login.service';
import {CreditCardService} from '../service/credit-card.service';
import {TransazioneService} from '../service/transazione.service';
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  prezzoTotale: number;
  carrello: Array<Prodotto> = new Array();
  transazione = new Transazione()
  crediCard=0
  listaCarte = new Array()
  offersDate = new Date();
  dateNow = new Date();
  ddNow = new Date();
  dddNow = new Date();
  userLogged=new User()
  logged = false;

  constructor(private _sharedService: SharedService, private loginService: LoginService, private creditService: CreditCardService, private transService: TransazioneService, private router: Router) {
    this.getCarrello();
    this.getCarte();
    this.getUtente();
    _sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.getCarrello();
      this.getCarte()
      this.getUtente();
    });
    let userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged != null) {
      let token: string [] = atob(localStorage.getItem('token')).split(':');
      let user = {username: token[0], password: token[1]};
      this.loginService.login(user).subscribe(data => {
        console.log('logged ' + data)
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        this.logged = true;
      }, err => {
        console.error(err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = false;
      })
    }
    _sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      if(text=="login")
        this.logged = true;
    });
  }

  ngOnInit() {
  }

  getUtente(){
    this.loginService.dettagli().subscribe( d => {
      this.userLogged = <User>d
    })
  }

  getCarrello() {
    this.offersDate.setDate(this.offersDate.getDate() + 3);
    this.ddNow.setDate(this.ddNow.getDate() - 1);
    this.dddNow.setDate(this.dddNow.getDate() + 1);
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
    }
    this.carrello = JSON.parse(localStorage.getItem('carrello'));
    for(let prod of this.carrello){
      prod.dataScadenza = new Date(prod.dataScadenza);
    }
    this.prezzoTotale = 0;
    for (let prod of this.carrello) {
      if (this.offersDate < prod.dataScadenza) {
        this.prezzoTotale += prod.prezzoUnitario * prod.quantitaDaAcquistare;
      }else if(this.offersDate > prod.dataScadenza && this.dateNow < prod.dataScadenza){
        this.prezzoTotale += (prod.prezzoUnitario * 0.7)*prod.quantitaDaAcquistare;
      }else if(this.ddNow < prod.dataScadenza && this.dddNow > prod.dataScadenza){
        this.prezzoTotale += (prod.prezzoUnitario * 0.3)*prod.quantitaDaAcquistare;
      }
    }
  }

  deleteCarrello(product: Prodotto) {
    this.prezzoTotale = 0;
    this.getCarrello();
    this.carrello.splice(this.carrello.indexOf(product), 1);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
    this.getCarrello();
  }

  clearCarrello() {
    localStorage.setItem('carrello', JSON.stringify(new Array()));
    this.carrello = new Array();
    this.prezzoTotale = 0;
  }

  logOption(){
    console.log(this.crediCard)
  }

  buyCarrello() {
    this.transazione.listaProdotti = JSON.parse(localStorage.getItem('carrello'))
    localStorage.setItem('carrello', JSON.stringify(new Array()));
    console.log(this.transazione)
    this.transService.saveTransaction(this.transazione, this.crediCard).subscribe(result=> {
      this.carrello = new Array()
      console.log(result)
    }
  )
  }

  getCarte() {
    this.listaCarte=new Array()
    this.creditService.getAll().subscribe(d => {
      console.log(d)
      this.listaCarte = d;
      for(let card of this.listaCarte){
        card.numeroCarta=atob(card.numeroCarta)
        // this.listaCarte.push(card)
        console.log(card)
      }

    })
  }
}

