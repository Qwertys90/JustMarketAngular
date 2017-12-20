import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Prodotto} from '../models/prodotto';
import {SharedService} from "../service/shared.service";
import swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  categoria: any;
  listProd: Array<Prodotto> = [];
  listProdTotale: Array<Prodotto> = [];
  listaProdottiCarrello: Array<Prodotto> = [];
  offersDate = new Date();
  ddNow = new Date();
  dddNow = new Date();
  dateNow= new Date();

  constructor(private prodServ: ProductService, private _sharedService: SharedService, private router: ActivatedRoute) {
    this.router.params.subscribe(d=> this.categoria = d);
    this.getAll();

  }

  ngOnInit() {
  }
  filtroOffers=false;
  filtroDisponibili=false;
  prezzoMinimo;
  prezzoMassimo;
  cerca='';

  getAll() {
    this.offersDate.setDate(this.offersDate.getDate() + 3);
    this.dddNow.setDate(this.dddNow.getDate() + 1);
    this.ddNow.setDate(this.ddNow.getDate() - 1);
    console.log('filter'+this.filtroOffers)
    this.prodServ.getAll().subscribe(d => {
      this.listProdTotale = d;
      this.listProd=this.listProdTotale
      for (let prod of this.listProdTotale){
        prod.dataScadenza = new Date(prod.dataScadenza);
      }
      this.listProdTotale.filter(prod => prod.dataScadenza >= this.ddNow);
      console.log(this.listProdTotale)
      this.filtra()
    });
  }

  filtra(){
    this.listProd=this.listProdTotale;
    console.log(this.categoria.categoria)
    if(this.categoria.categoria == 'ALIMENTARI')
      this.listProd = this.listProd.filter(prod => prod.categoria == 'ALIMENTARI');
    if(this.categoria.categoria == 'PRODOTTICASA')
      this.listProd = this.listProd.filter(prod=> prod.categoria == 'PRODOTTICASA');
    if(this.categoria.categoria == 'BEAUTY')
      this.listProd = this.listProd.filter(prod=> prod.categoria == 'BEAUTY');
    if(this.categoria.categoria == 'ANIMALI')
      this.listProd = this.listProd.filter(prod=> prod.categoria == 'ANIMALI');
    if(this.filtroOffers)
    this.listProd = this.listProd.filter(prod => prod.offerta===true);
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
