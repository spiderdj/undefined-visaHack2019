import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { UiModule } from './ui/ui.module';

import { ShopComponent } from './shop/shop.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { BudgetPageComponent } from './budget-page/budget-page.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ShopComponent,
    BudgetPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
