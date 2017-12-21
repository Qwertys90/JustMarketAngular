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
import swal from 'sweetalert2';
import {ProductService} from "../service/product.service";
import {Observable} from "rxjs/Observable";
import {ProductComponent} from "../product/product.component";


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  prezzoTotale: number;
  carrello: Array<Prodotto> = new Array();
  transazione = new Transazione()
  crediCard = 0
  listaCarte = new Array()
  offersDate = new Date();
  dateNow = new Date();
  ddNow = new Date();
  dddNow = new Date();
  userLogged = new User()
  logged = false;

  constructor(private _sharedService: SharedService, private loginService: LoginService, private creditService: CreditCardService, private transService: TransazioneService, private router: Router, private prodServ: ProductService) {
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
      if (text == "login")
        this.logged = true;
    });
  }

  ngOnInit() {
  }

  getUtente() {
    this.loginService.dettagli().subscribe(d => {
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
    for (let prod of this.carrello) {
      prod.dataScadenza = new Date(prod.dataScadenza);
    }
    this.prezzoTotale = 0;
    for (let prod of this.carrello) {
      if (this.offersDate < prod.dataScadenza) {
        this.prezzoTotale += prod.prezzoUnitario * prod.quantitaDaAcquistare;
      } else if (this.offersDate > prod.dataScadenza && this.dateNow < prod.dataScadenza) {
        this.prezzoTotale += (prod.prezzoUnitario * 0.7) * prod.quantitaDaAcquistare;
      } else if (this.ddNow < prod.dataScadenza && this.dddNow > prod.dataScadenza) {
        this.prezzoTotale += (prod.prezzoUnitario * 0.3) * prod.quantitaDaAcquistare;
      }
      let prodott: Prodotto;
      this.prodServ.getById(prod.id).subscribe(d => {
        prodott = <Prodotto>d;
        if (prod.quantitaDaAcquistare > prodott.quantita) {
          prod.quantitaDaAcquistare = prodott.quantita;
        }
        if (prodott.quantita == 0) {
          this.deleteCarrello(prod);

        }
      });

    }
  }

  deleteCarrello(product: Prodotto) {
    this.prezzoTotale = 0
    this.getCarrello()
    console.log(product)
    let index = 0;
    let cacca: number = 0
    for (let x of this.carrello) {

      if (product.id == x.id) {
        index = cacca;
      }
      cacca++
    }
    this.carrello.splice(index, 1);
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
    this.getCarrello();
  }

  clearCarrello() {
    localStorage.setItem('carrello', JSON.stringify(new Array()));
    this.carrello = new Array();
    this.prezzoTotale = 0;
  }

  logOption() {
    console.log(this.crediCard)
  }

  buyCarrello() {
    this.aggiorna()
    swal({
      title: 'Vuoi procedere con la transazione?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continua',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.crediCard != 0 && JSON.parse(localStorage.getItem('carrello')).length != 0) {
          this.transazione.listaProdotti = JSON.parse(localStorage.getItem('carrello'))
          localStorage.setItem('carrello', JSON.stringify(new Array()));
          console.log(this.transazione)
          this.transService.saveTransaction(this.transazione, this.crediCard).subscribe(result => {
              this.carrello = new Array()
              this._sharedService.emitChange('comprato');
              console.log(result);
              swal({
                title: 'Prodotto acquistato!',
                text: 'Grazie per il tuo acquisto',
                type: 'success',
                showConfirmButton: false,
                timer: 1500,
                onOpen: () => {
                  swal.showLoading()
                }
              });
              this.prezzoTotale = 0;
            }
          )
        } else {
          if (this.crediCard == 0) {
            swal(
              'Oops...',
              'Carta di credito assente',
              'error'
            )
          } else {
            swal(
              'Peccato! Sei arrivato tardi',
              'Prodotti esauriti',
              'error'
            )
          }
        }
      }
    })
  }

  getCarte() {
    this.listaCarte = new Array()
    this.creditService.getAll().subscribe(d => {
      console.log(d)
      this.listaCarte = d;
      for (let card of this.listaCarte) {
        card.numeroCarta = atob(card.numeroCarta)
        // this.listaCarte.push(card)
        console.log(card)
      }

    })
  }

  aggiorna() {
    for (let prod of this.carrello) {
      if (prod.quantitaDaAcquistare == 0) {
        this.deleteCarrello(prod);
        console.log(prod)
        break
      }
    }
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
    this.getCarrello();
  }

}

