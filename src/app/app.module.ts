import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarlosCurrencyComponent } from './carlos-currency/carlos-currency.component';
import { CarlosWalletComponent } from './carlos-wallet/carlos-wallet.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CarlosCurrencyComponent,
    CarlosWalletComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'currency', component: CarlosCurrencyComponent},
      {path: 'wallet', component: CarlosWalletComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
