import { Component, OnInit } from '@angular/core';
import { CarlosWalletService } from '../carlos-wallet.service';

@Component({
  selector: 'app-carlos-wallet',
  templateUrl: './carlos-wallet.component.html',
  styleUrls: ['./carlos-wallet.component.css']
})
export class CarlosWalletComponent implements OnInit {

  saldo: number;
  saldoUsd: number;
  saldoEuro: number;

  constructor(private walletService: CarlosWalletService) { }

  ngOnInit(): void {
    this.saldo = this.walletService.saldo;
  }

  onAdd(qt: number) {
    this.walletService.addSaldo(qt);
    this.saldo = this.walletService.saldo;
    this.saldoUsd = this.walletService.saldoUsd;
    this.saldoEuro = this.walletService.saldoEuro;
  }

  onRemove(qt: number) {
    this.walletService.removeSaldo(qt);
    this.saldo = this.walletService.saldo;
    this.saldoUsd = this.walletService.saldoUsd;
    this.saldoEuro = this.walletService.saldoEuro;
  }

}
