import {Component, OnInit} from '@angular/core';
import {TransazioneService} from '../service/transazione.service';
import {Transazione} from '../models/transazione';
import {CreditCardService} from '../service/credit-card.service';
import {CreditCard} from '../models/creditcard';
import swal from 'sweetalert2';
import {User} from '../models/user';
import {LoginService} from '../service/login.service';
import {SharedService} from '../service/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private transService: TransazioneService, private creditCardService: CreditCardService, private loginServ: LoginService,
              private _sharedService: SharedService, private router: Router) {
    this.getUser()
    this.getAllTransazioni();
    this.getAllCreditCard();
  }
  user:User=new User();
  cognome:string='';
  nome:string='';
  provincia:string='';
  citta:string='';
  via:string='';
  cellulare:string='';
  cap:string='';
  username:string='';
  listaTransazioni = new Array<Transazione>();
  listaCard = new Array<CreditCard>();
  creditCard = new CreditCard();
  password="";
  password2="";

  ngOnInit() {
  }

  getAllTransazioni() {
    this.transService.getAll().subscribe(d => this.listaTransazioni = <Array<Transazione>>d);
  }

  getAllCreditCard() {
    this.creditCardService.getAll().subscribe(d => {
      this.listaCard = <Array<CreditCard>>d;
      for (let card of this.listaCard) {
        card.numeroCarta = atob(card.numeroCarta);
      }

    });
  }

  saveCarta() {
    this.creditCardService.saveCarta(this.creditCard).subscribe(() => {
        console.log('aggiunta');
        swal({
          title: 'Carta aggiunta con successo! ',
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
          onOpen: () => {
            swal.showLoading();
          }
        });
        this.creditCard = new CreditCard;
        this.getAllCreditCard();
      }
    );
  }

  modificaRecapiti(){
    this.user.nome=this.nome
    this.user.cognome=this.cognome
    this.user.provincia=this.provincia
    this.user.cap=this.cap
    this.user.via=this.via
    this.user.citta=this.citta

    this.loginServ.modifica(this.user).subscribe(()=> {
        this.getUser()
        this._sharedService.emitChange('logged=true')
      }
    )

  }

  modificaUsername(){

    this.user.username=this.username
    console.log(this.user)
    this.loginServ.modifica(this.user).subscribe(()=> {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      swal({
        title:'Torna a trovarci!',
        text:'Log-out...',
        type:'info',
        showConfirmButton: false,
        timer: 1500,
        onOpen: () => {
          swal.showLoading()
        }
      });
      localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
      this._sharedService.emitChange('sloggare');
      this.router.navigate(['homepage']);
      }
    )

  }

  modificaPassword(){
    if(this.password==this.password2) {
      this.user.password = this.password
      this.loginServ.register(this.user).subscribe(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          swal({
            title: 'Torna a trovarci!',
            text: 'Log-out...',
            type: 'info',
            showConfirmButton: false,
            timer: 1500,
            onOpen: () => {
              swal.showLoading()
            }
          });
          localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
          this._sharedService.emitChange('sloggare');
          this.router.navigate(['homepage']);
        }
      )
    }
    else{
      swal({
        title: 'Le password non  corrispondono!',
        text: 'Password non modificata!',
        type: 'error',
        showConfirmButton: false,
        timer: 1500,
        onOpen: () => {
          swal.showLoading()
        }
      });
      this.password=""
      this.password2=""
    }
  }

  getUser(){
    this.loginServ.dettagli().subscribe( d => {
      console.log(d)
      this.user=<User>d
      this.cognome=this.user.cognome
      this.nome=this.user.nome
      this.via=this.user.via
      this.citta=this.user.citta
      this.provincia=this.user.provincia
      this.cellulare=this.user.cellulare
      this.cap=this.user.cap
      this.username=this.user.username
    })
  }

}

