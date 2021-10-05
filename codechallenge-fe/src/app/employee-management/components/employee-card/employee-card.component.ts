import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { GenderEnum } from 'src/app/shared/enums/gender-enum';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;

  public employeeFullName: string;

  constructor(private router: Router, private empSVc: EmployeesService) { }

  ngOnInit(): void {
    this.employeeFullName = ` ${this.employee.firstName} ${this.employee.lastName}`;
  }

  getAvatarSource() {
    if (this.employee.gender) {
      switch (this.employee.gender.toLowerCase()) {
        case GenderEnum.Male.toString().toLocaleLowerCase():
          return "assets/images/male-avatar.svg"
        case GenderEnum.Female.toString().toLocaleLowerCase():
          return "assets/images/female-avatar.svg"
        default:
          return "assets/images/default-avatar.svg"
      }
    }else{
      return "assets/images/default-avatar.svg"
    }
  }
  deleteEmployee() {
  }
}
