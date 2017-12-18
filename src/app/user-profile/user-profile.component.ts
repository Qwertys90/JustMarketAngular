import { Component, OnInit } from '@angular/core';
import {TransazioneService} from '../service/transazione.service';
import {Transazione} from '../models/transazione';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private transService: TransazioneService) { }
  listaTransazioni= new Array<Transazione>()
  ngOnInit() {
  }

  getAll(){
    this.transService.getAll().subscribe(d=> this.listaTransazioni=<Array<Transazione>>d)
  }

}
