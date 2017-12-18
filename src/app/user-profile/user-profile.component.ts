import { Component, OnInit } from '@angular/core';
import {TransazioneService} from '../service/transazione.service';
import {Transazione} from '../models/transazione';
import {CreditCardService} from '../service/credit-card.service';
import {CreditCard} from '../models/creditcard';
import swal from "sweetalert2";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private transService: TransazioneService, private creditCardService: CreditCardService) {
    this.getAllTransazioni()
    this.getAllCreditCard()
  }
  listaTransazioni= new Array<Transazione>()
  listaCard = new Array<CreditCard>()
  creditCard= new CreditCard();
  ngOnInit() {
  }

  getAllTransazioni(){
    this.transService.getAll().subscribe(d=> this.listaTransazioni=<Array<Transazione>>d)
  }

  getAllCreditCard(){
    this.creditCardService.getAll().subscribe(d=> {
      this.listaCard=<Array<CreditCard>>d
      for(let card of this.listaCard){
        card.numeroCarta=atob(card.numeroCarta)
      }

    })
  }

  saveCarta(){
    this.creditCardService.saveCarta(this.creditCard).subscribe( ()=> {
        console.log("aggiunta")
      swal({
        title: 'Carta aggiunta con successo! ',
        type: 'success',
        showConfirmButton: false,
        timer: 1000,
        onOpen: () => {
          swal.showLoading()
        }
      });
        this.creditCard=new CreditCard;
        this.getAllCreditCard()
      }
    )
  }

}
