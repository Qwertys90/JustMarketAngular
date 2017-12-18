import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Prodotto} from '../models/prodotto';
import {SharedService} from "../service/shared.service";
import swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProd: Array<Prodotto> = [];
  listProdTotale: Array<Prodotto> = [];
  listaProdottiCarrello: Array<Prodotto> = [];

  constructor(private prodServ: ProductService, private _sharedService: SharedService) {

    this.getAll()

  }

  ngOnInit() {
  }
  filtroOffers=false;
  filtroDisponibili=false;
  prezzoMinimo;
  prezzoMassimo;
  cerca='';

  getAll() {
    console.log('filter'+this.filtroOffers)
    this.prodServ.getAll().subscribe(d => {
      this.listProdTotale = d;
      this.listProd=this.listProdTotale
    });
  }

  filtra(){
    this.listProd=this.listProdTotale
    if(this.filtroOffers)
    this.listProd = this.listProd.filter(prod => prod.offerta===true );
    if(this.filtroDisponibili)
      this.listProd = this.listProd.filter(prod => prod.quantita>0 );
    if(this.prezzoMinimo!=null)
      this.listProd = this.listProd.filter(prod => prod.prezzoUnitario>this.prezzoMinimo );
    if(this.prezzoMassimo!=null)
      this.listProd = this.listProd.filter(prod => prod.prezzoUnitario<this.prezzoMassimo );
    if(this.prezzoMassimo!=null && this.prezzoMinimo!=null)
      this.listProd = this.listProd.filter(prod => prod.prezzoUnitario<this.prezzoMassimo && prod.prezzoUnitario>this.prezzoMinimo);
    if(this.cerca!=null)
      this.listProd = this.listProd.filter(prod =>
        prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase())
      );

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
    swal({
      title: 'Prodotto aggiunto al carrello!',
      type: 'success',
      showConfirmButton: false,
      timer: 1000,
      onOpen: () => {
        swal.showLoading()
      }
    });

    localStorage.setItem('carrello',JSON.stringify(this.listaProdottiCarrello));
    this._sharedService.emitChange('logged=true');
  }
}
