import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { GenderEnum } from 'src/app/shared/enums/gender-enum';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;

  public employeeFullName: string;

  constructor() { }

  ngOnInit(): void {
    this.employeeFullName = ` ${this.employee.firstName} ${this.employee.lastName}`;
  }

  getAvatarSource() {
    switch (this.employee.gender.toLowerCase()) {
      case GenderEnum.Male.toString().toLocaleLowerCase():
        return "assets/images/male-avatar.svg"
      case GenderEnum.Female.toString().toLocaleLowerCase():
        return "assets/images/female-avatar.svg"
      default:
        return "assets/images/default-avatar.svg"
    }
  }

}
