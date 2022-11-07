import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { allEmployees } from './employeeList';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /** getAllEmployees() method is used to get list of all employees */
  public getAllEmployees() : Employee[] {
    return allEmployees;
  }
}
