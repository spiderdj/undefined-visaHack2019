import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
