import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ShopComponent }   from './shop/shop.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';
 
const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'budget', component: BudgetPageComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}