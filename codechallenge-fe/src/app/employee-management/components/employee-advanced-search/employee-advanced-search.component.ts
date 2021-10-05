import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-advanced-search',
  templateUrl: './employee-advanced-search.component.html',
  styleUrls: ['./employee-advanced-search.component.css']
})
export class EmployeeAdvancedSearchComponent implements OnInit {

  public departments = [];
  public employmentTypes = [];
  public jobtitles = [];

  public jobTitleId : number ;
  public employmentTypeId : number ;
  public departmentId : number ;

  constructor(private empService: EmployeesService) { }

  ngOnInit(): void {
    forkJoin(
      this.empService.getDepartments(),
      this.empService.getEmploymentTypes(),
      this.empService.getjobTitles()
    ).subscribe (results => {
      this.departments = results[0];
      this.employmentTypes = results[1];
      this.jobtitles = results[2];
    });
  }

  onDepartmentChange(event: any) {
    this.departmentId = event.values[0].id;
  }

  onEmploymentTypeChange(event: any) {
    this.employmentTypeId = event.values[0].id;
  }

  onJobTitleChange(event: any) {
    this.jobTitleId = event.values[0].id;
  }

  public getValues(): {
    jobTitleId : number
    employmentTypeId : number
    departmentId : number
  } {
    return {
      jobTitleId : this.jobTitleId,
      employmentTypeId : this.employmentTypeId,
      departmentId : this.departmentId
    }
  }

}
