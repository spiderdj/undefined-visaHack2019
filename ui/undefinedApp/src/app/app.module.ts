import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import { ShopComponent } from './shop/shop.component';

import { AppRoutingModule } from './app-routing.module'; 

import { HttpClientModule }    from '@angular/common/http';
import { BudgetPageComponent } from './budget-page/budget-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BudgetPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
