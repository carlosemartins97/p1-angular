import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


interface USDeBRL {
  time: {
    updated: string;
  },
  bpi: {
    USD: {
      rate_float: number;
    },
    BRL: {
      rate_float: number;
    }
  }
}

interface cotacaoEUR {
  bpi: {
    EUR: {
      rate_float: number;
    }
  }
}

interface cotacoes {
  updatedAt: string;
  USD: number;
  BTC: number;
  EUR?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarlosWalletService {

  cotacaoObjetoCompleto: cotacoes;

  listaDeCotacoes: Array<cotacoes> = [];

  dolar: number;
  euro: number;
  btc: number;

  dolarFlow = new EventEmitter<number>();
  euroFlow = new EventEmitter<number>();
  btcFlow = new EventEmitter<number>();

  saldo = 0;
  saldoUsd = 0;
  saldoEuro = 0;

  constructor(private http: HttpClient) { }

  getCotaUSDeBRL() {
    this.http.get<USDeBRL>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json').subscribe(data => {
      this.dolar = data.bpi.BRL.rate_float/data.bpi.USD.rate_float;
      this.btc = data.bpi.BRL.rate_float;
      this.cotacaoObjetoCompleto = {
        updatedAt: data.time.updated,
        USD: this.dolar,
        BTC: data.bpi.BRL.rate_float,
      }
    })
  }

  getCotaEUR() {
    this.getCotaUSDeBRL();
    this.http.get<cotacaoEUR>('https://api.coindesk.com/v1/bpi/currentprice/EUR.json').subscribe(data => {
      this.euro = this.btc/data.bpi.EUR.rate_float;
      this.cotacaoObjetoCompleto = {
        ...this.cotacaoObjetoCompleto,
        EUR: this.euro
      }
      this.listaDeCotacoes.push(this.cotacaoObjetoCompleto);

      const todasCotacoes = this.listaDeCotacoes.length; 
      const ultimaCotacao = todasCotacoes - 1;
      const penultimaCotacao = todasCotacoes - 2;
      if(todasCotacoes >= 2) {
        if(this.listaDeCotacoes[ultimaCotacao].USD > this.listaDeCotacoes[penultimaCotacao].USD) {
          this.dolarFlow.emit(1);
        } else if(this.listaDeCotacoes[ultimaCotacao].USD === this.listaDeCotacoes[penultimaCotacao].USD) {
          this.dolarFlow.emit(0);
        } else {
          this.dolarFlow.emit(2);
        }

        if(this.listaDeCotacoes[ultimaCotacao].BTC > this.listaDeCotacoes[penultimaCotacao].BTC) {
          this.btcFlow.emit(1);
        } else if(this.listaDeCotacoes[ultimaCotacao].BTC === this.listaDeCotacoes[penultimaCotacao].BTC) {
          this.btcFlow.emit(0);
        } else {
          this.btcFlow.emit(2);
        }

        let ultimaCotacaoEuro = this.listaDeCotacoes[ultimaCotacao].EUR;
        let penultimaCotacaoEuro = this.listaDeCotacoes[penultimaCotacao].EUR;
        if(ultimaCotacaoEuro && penultimaCotacaoEuro) {
          if(ultimaCotacaoEuro > penultimaCotacaoEuro) {
            this.euroFlow.emit(1);
          } else if(ultimaCotacaoEuro === penultimaCotacaoEuro) {
            this.euroFlow.emit(0);
          } else {
            this.euroFlow.emit(2);
          }
        }
        
      }
    })
  }

  updateAutomaticamente(time: number) {
    this.getCotaEUR();
    setInterval(() => {
      this.getCotaEUR();
    }, time)
  }

  addSaldo(qt: number) {
    this.saldo += qt / this.btc;
    this.saldoUsd += qt / this.dolar;
    this.saldoEuro += qt/ this.euro;
  }

  removeSaldo(qt: number) {
    this.saldo -= qt / this.btc;
    this.saldoUsd -= qt / this.dolar;
    this.saldoEuro -= qt/ this.euro;
  }
}
