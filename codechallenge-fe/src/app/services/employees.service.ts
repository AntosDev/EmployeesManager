import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeSearchResult } from '../models/employee-search-result';
import { Department } from '../models/department';
import { Jobtitle } from '../models/jobtitle';
import { Employmenttype } from '../models/employmenttype';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public searchEmployees(options: any)
    : Observable<{ keyword: string, searchResults: Employee[], totalCount: number }> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}/users/search`;
    let payLoad = {
      Options: {
        SortDirection: options.order ? options.order.dir : null,
        SortBy: options.order ? options.order.prop : null,
        Keyword: options.keyword
      }
    };
    return this.http.post<EmployeeSearchResult>(url, payLoad).pipe(
      map(response => {
        return {
          keyword: response.keyword,
          searchResults: response.employees.map(emp => new Employee(emp)),
          totalCount: response.employees.length
        }
      })
    );
  }

  public getDepartments(): Observable<Department[]> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}/users/search`;
    return this.http.get<Department[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getjobTitles(): Observable<Jobtitle[]> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}/users/search`;
    return this.http.get<Jobtitle[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getEmploymentTypes(): Observable<Employmenttype[]> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}/users/search`;
    return this.http.get<Employmenttype[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}

