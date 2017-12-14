import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Prodotto} from '../models/prodotto';
import {PageScrollConfig} from 'ng2-page-scroll';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  listProd: Array<Prodotto> = [];
  listOffers: Array<Prodotto> = [];

  constructor(private prodServ: ProductService) {
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

}
