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

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient, private appConfigService : AppConfigService) { }

  public searchEmployees(options: any)
    : Observable<{ keyword: string, searchResults: Employee[], totalCount: number }> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}${ApiRoutes.GetAllEmployees}}`;
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

  public addEmpoloyee(employee: Employee): Observable<any> {
    
    let url: string = `${this.appConfigService.appConfig.ServerUrl}/users/search`;

    return this.http.post<any>(url,employee).pipe(
      map(response => {
        return response;
      })
    );
  }

  public getDepartments(): Observable<Department[]> {
    let url: string = `${this.appConfigService.appConfig.ServerUrl}${ApiRoutes.GetAllDepartments}`;
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
    let url: string = `${this.appConfigService.appConfig.ServerUrl}${ApiRoutes.GetAllEmploymentTypes}`;
    return this.http.get<Employmenttype[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}

