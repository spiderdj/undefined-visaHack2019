import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Budget } from '../model/budget';

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
  budgetUserUrl: string = "http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/budget/"
  addBudgetUrl: string = "http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/budget/"
  demoBudgetUserUrl: string = "http://visa-grad-hack-undefined.uksouth.cloudapp.azure.com:5000/setSpentBudget/"
  constructor(private http: HttpClient) { }

  getUserBudget(userId: number): Observable<Budget> {
    return this.http.get<Budget>(this.budgetUserUrl + userId.toString());
  }

  saveUserBudget(budget: Budget, userId: number) : Observable<Budget>{
    return this.http.put<Budget>(this.addBudgetUrl + userId.toString(), budget, httpOptions);

  }

  demoSpentBudget(userId: number) {
    return this.http.post(this.demoBudgetUserUrl+1, 
      {
        LEISURE: 5,
        TRAVEL: 5,
        ELECTRONICS_MEDIA: 5,
        FOOD_DRINK: 5,
        SUPERMARKET: 5,
        OTHER: 5,
      });
  }
  
}
