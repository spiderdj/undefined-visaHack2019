import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', redirectTo: '/pet', pathMatch: 'full' },
  { path: 'pet', component: GameComponent},
  { path: 'shop', component: ShopComponent },
  { path: 'budget', component: BudgetPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
