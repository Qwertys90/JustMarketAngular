import {CreditCard} from './creditcard';
import {Transazione} from './transazione';

export class User{
  id?: number;
  via: string;
  cap: string;
  citta: string;
  provincia: string;
  cellulare: string;
  nome: string;
  cognome: string;
  username: string;
  password: string;
  tipo:string;
  listaCreditCard:Array<CreditCard>;
  transazioni:Array<Transazione>;
}
