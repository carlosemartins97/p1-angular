import { Component, OnInit } from '@angular/core';
import { CarlosWalletService } from '../carlos-wallet.service';

interface cotacoes {
  updatedAt: string;
  USD: number;
  BTC: number;
  EUR?: number;
}

@Component({
  selector: 'app-carlos-currency',
  templateUrl: './carlos-currency.component.html',
  styleUrls: ['./carlos-currency.component.css']
})
export class CarlosCurrencyComponent implements OnInit {

  constructor(public walletService: CarlosWalletService) { }

  ngOnInit(): void {
  }

}
