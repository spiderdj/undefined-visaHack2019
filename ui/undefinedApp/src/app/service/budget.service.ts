import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Budget } from '../model/budget';
import { BUDGET } from '../model/mock-budget';

import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  //budgetURL: string = 'api/getAllBudget';
  budgetURL: string = 'https://raw.githubusercontent.com/zhiyu-tracy-yang/budget-json-test-data/master/budget.json';
  private getBudgetURL = 'api/getAllBudget';

  constructor(private http: HttpClient) { }

  // getAllBudget() : Observable<Budget>{
  //   return this.http.get<Budget>(this.getBudgetURL);
  // }
  getAllBudget(): Observable<Budget> {
    console.log(BUDGET);
    return of(BUDGET);
  }

  saveAllBudget(budget: Budget) : Observable<Budget>{
    return this.http.post<Budget>(this.budgetURL, budget, httpOptions);

  }
}
