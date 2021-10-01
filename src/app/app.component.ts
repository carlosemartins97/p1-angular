import { Component, OnInit } from '@angular/core';
import { CarlosWalletService } from './carlos-wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dolarFlow: number;
  btcFlow: number;
  euroFlow: number;

  constructor(private walletService: CarlosWalletService) {}

  ngOnInit() {
    this.walletService.updateAutomaticamente(50000);

    this.walletService.dolarFlow.subscribe(data => {
      this.dolarFlow = data;
      console.log('dolar' + data);
    })

    this.walletService.btcFlow.subscribe(data => {
      this.btcFlow = data;
      console.log('btc' +data);
    })

    this.walletService.euroFlow.subscribe(data => {
      this.euroFlow = data;
      console.log('euro' +data);
    })
  }
}
