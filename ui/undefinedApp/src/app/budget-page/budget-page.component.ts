import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../model/budget';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.css']
})
export class BudgetPageComponent implements OnInit {

  budget:Budget;
  group : FormGroup;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.getAllBudget();
  }

  getAllBudget() :void {
    this.budgetService.getAllBudget()
        .subscribe(allBudget => this.budget = allBudget);
}

  submitBudget(budgetLeisure, budgetTravel){
    console.log(budgetLeisure, budgetTravel);
    this.budgetService.saveAllBudget({budgetLeisure, budgetTravel} as Budget).subscribe(budget => {
      console.log(budget);
    }) 
  }
}
