import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  
  budget = {
    currentBudget: 0,
    leisureBudget: 0,
    supermarketBudget: 0,
  }

  @ViewChild('budgetForm') form:any;
  constructor() { }

  ngOnInit() {
    this.budget = {
      currentBudget: 10,
      leisureBudget: 2,
      supermarketBudget: 8

    }
  }

}
