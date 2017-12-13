export class Prodotto{
  id?: number;
  img: string;
  marca: string;
  nome: string;
  descrizione?: string;
  dataScadenza: string;
  quantita: number;
  unita: number;
  quantitaDaAcquistare: number;
  prezzoUnitario: number;
  offerta: boolean;
  sconto: number;
  prezzoNoIva?: number;
  prezzoIvato?: number;
}
