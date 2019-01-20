import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ShopComponent }   from './shop/shop.component';
import { BudgetComponent }   from './budget/budget.component';

 
const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'budget', component: BudgetComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}