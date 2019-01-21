import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../model/budget';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.css']
})
export class BudgetPageComponent implements OnInit, OnDestroy {

  budget: Budget;
  form: FormGroup;
  leisure: number;
  travel: number;
  electronicsMedia: number;
  foodDrink: number;
  supermarket: number;
  other: number;
  userBudgetSubcription: Subscription;
  saveUserBudgetSubscription: Subscription; 

  constructor(private budgetService: BudgetService, fb: FormBuilder) {
    this.form = fb.group({
      leisure: this.leisure,
      travel: this.travel,
      electronicsMedia: this.electronicsMedia,
      foodDrink: this.foodDrink,
      supermarket: this.supermarket,
      other: this.other
   });
   }

  ngOnInit() {
    this.getUserBudget(1);
  }

  ngOnChanges(change: SimpleChanges) {
  }

  getUserBudget(userId: number): void {
    this.userBudgetSubcription = this.budgetService.getUserBudget(userId)
        .subscribe(
          (allBudget) => {
          this.budget = allBudget,
          this.leisure = this.budget.LEISURE,
          this.travel = this.budget.TRAVEL;
          this.electronicsMedia = this.budget.ELECTRONICS_MEDIA,
          this.foodDrink = this.budget.FOOD_DRINK,
          this.supermarket = this.budget.SUPERMARKET,
          this.other = this.budget.OTHER
          this.patchValues(this.budget);
          }
          );
}

  submitBudget(){
    this.budget.ELECTRONICS_MEDIA = this.form.get("electronicsMedia").value;
    this.budget.FOOD_DRINK = this.form.get("foodDrink").value;
    this.budget.LEISURE = this.form.get("leisure").value;
    this.budget.OTHER = this.form.get("other").value;
    this.budget.SUPERMARKET = this.form.get("supermarket").value;
    this.budget.TRAVEL = this.form.get("travel").value;
    console.log(this.budget);
    this.saveUserBudgetSubscription = this.budgetService.saveUserBudget(this.budget, 1).subscribe(budget => {
      console.log(budget)
    }) 
  }

  patchValues(budget: Budget) {
    this.form.patchValue({leisure: budget.LEISURE});
    this.form.patchValue({travel: budget.TRAVEL});
    this.form.patchValue({electronicsMedia: budget.ELECTRONICS_MEDIA});
    this.form.patchValue({foodDrink: budget.FOOD_DRINK});
    this.form.patchValue({supermarket: budget.SUPERMARKET});
    this.form.patchValue({other: budget.OTHER});
  }

  ngOnDestroy() {
    this.userBudgetSubcription.unsubscribe();
    this.saveUserBudgetSubscription.unsubscribe();
  }
}
