import {User} from './user';

export class CreditCard{
  id?: number;
  nome: string;
  cognome: string;
  numeroCarta: string;
  cvv: string;
  scadenza: string;
  user:User;
}
