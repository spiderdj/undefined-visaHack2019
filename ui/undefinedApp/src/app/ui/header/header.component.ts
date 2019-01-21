import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/model/budget';
import { BudgetService } from 'src/app/service/budget.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  demo(){
    this.budgetService.demoSpentBudget(1).subscribe(() => {
      console.log('demo spent budget');
    });
  }
}
