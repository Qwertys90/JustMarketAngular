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
  constructor(private prodServ: ProductService) { }

  ngOnInit() {
  }

  color = 'accent';
  checked = false;
  disabled = false;


  getAll() {
    this.prodServ.getAll().subscribe(d => {
      this.listProdTotale = d;
      this.listProd = this.listProdTotale.filter(prod => {
        //completare

    });

    });
  }

}
