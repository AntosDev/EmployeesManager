import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeSearchResult } from '../models/employee-search-result';
import { Department } from '../models/department';
import { Jobtitle } from '../models/jobtitle';
import { Employmenttype } from '../models/employmenttype';
import { AppConfigService } from '../shared/services/app-config.service';
import { ApiRoutes } from '../shared/enums/api-routes';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  //serverURL : string = this.appConfigService.appConfig.ServerUrl;
  serverURL: string = "http://localhost:8083";

  constructor(private http: HttpClient, private appConfigService : AppConfigService) { }

  public searchEmployees(keyword: string)
    : Observable<Employee[]> {
    let url: string = `${this.serverURL}${ApiRoutes.SearchEmployees}`;
    let payload = {
      keyword : keyword
    }
    return this.http.post<Employee[]>(url, payload).pipe(
      map(response => {
        return response;
      })
    );
  }

  public advancedSearchEmployees(criteria: any)
  : Observable<Employee[]> {
  let url: string = `${this.serverURL}${ApiRoutes.AdvancedSearchEmployees}`;
  
  return this.http.post<Employee[]>(url, criteria).pipe(
    map(response => {
      return response;
    })
  );
}

  public addEmpoloyee(employee: Employee): Observable<any> {
    
    let url: string = `${this.serverURL}${ApiRoutes.AddEmployee}`;

    return this.http.post<any>(url,employee).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getDepartments(): Observable<Department[]> {
    let url: string = `${this.serverURL}${ApiRoutes.GetAllDepartments}`;
    return this.http.get<Department[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getjobTitles(): Observable<Jobtitle[]> {
    let url: string = `${this.serverURL}${ApiRoutes.GetAllJobTitles}`;
    return this.http.get<Jobtitle[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getEmploymentTypes(): Observable<Employmenttype[]> {
    let url: string = `${this.serverURL}${ApiRoutes.GetAllEmploymentTypes}`;
    return this.http.get<Employmenttype[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  public deleteEmployee(id: number){
    let url: string = `${this.serverURL}${ApiRoutes.DeleteEmployee}/${id.toString()}`;
    return this.http.get<Employmenttype[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}

