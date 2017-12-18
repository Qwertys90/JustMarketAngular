import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Prodotto} from '../models/prodotto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProd: Array<Prodotto> = [];
  listProdTotale: Array<Prodotto> = [];
  constructor(private prodServ: ProductService) {

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
}
