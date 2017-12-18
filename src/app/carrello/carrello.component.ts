import {Component, OnInit} from '@angular/core';
import {Prodotto} from '../models/prodotto';
import {SharedService} from '../service/shared.service';
import {Transazione} from '../models/transazione';
import {CreditCard} from '../models/creditcard';
import {LoginService} from '../service/login.service';
import {CreditCardService} from '../service/credit-card.service';
import {TransazioneService} from '../service/transazione.service';

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

  constructor(private _sharedService: SharedService, private loginService: LoginService, private creditService: CreditCardService, private transService: TransazioneService) {
    this.getCarrello();
    this.getCarte()
    _sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.getCarrello();
      this.getCarte()
    });
  }

  ngOnInit() {
  }

  getCarrello() {
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
    }
    this.carrello = JSON.parse(localStorage.getItem('carrello'));
    this.prezzoTotale = 0;
    for (let prod of this.carrello) {
      this.prezzoTotale += prod.prezzoUnitario * prod.quantitaDaAcquistare
    }
  }

  deleteCarrello(product: Prodotto) {
    this.getCarrello();
    this.carrello.splice(this.carrello.indexOf(product), 1);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  clearCarrello() {
    localStorage.setItem('carrello', JSON.stringify(new Array()));
    this.carrello = new Array()
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

