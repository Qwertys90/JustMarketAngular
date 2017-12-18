import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Prodotto} from '../models/prodotto';
import {PageScrollConfig} from 'ng2-page-scroll';
import {SharedService} from '../service/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  listProd: Array<Prodotto> = [];
  listOffers: Array<Prodotto> = [];
  listaProdottiCarrello: Array<Prodotto> = [];
  constructor(private prodServ: ProductService,private _sharedService: SharedService) {
    this.getAll();
    PageScrollConfig.defaultDuration=500;
  }

  ngOnInit() {
  }

  // getall() {
  //   this.prodServ.getAll().subscribe(d => {
  //     this.listProd = d;
  //     console.log(this.listProd);
  //   });
  // }

  getAll() {
    this.prodServ.getAll().subscribe(d => {
      this.listProd = d;
      this.listOffers = this.listProd.filter(prod => prod.offerta===true ).slice(0,6);
      console.log(this.listOffers);

    });
  }

  aggiungiAlCarrello(prod:Prodotto) {
    let id:number=0;
    let x:number=0;
    let control:boolean;
  this.listaProdottiCarrello=<Array<Prodotto>>JSON.parse(localStorage.getItem("carrello")  )
    prod.quantitaDaAcquistare=1
    for(let p of this.listaProdottiCarrello){
    if(p.id===prod.id) {
      id = x;
      control = true
    }
      x++
    }

    console.log(id)
    if(control) {
      this.listaProdottiCarrello[id].quantitaDaAcquistare = this.listaProdottiCarrello[id].quantitaDaAcquistare + 1
    }
    else
  this.listaProdottiCarrello.push(prod)

  localStorage.setItem('carrello',JSON.stringify(this.listaProdottiCarrello));
    this._sharedService.emitChange('logged=true');
}

}
