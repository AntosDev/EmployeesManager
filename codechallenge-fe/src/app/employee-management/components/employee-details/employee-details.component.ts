import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  private originalEmployee: Employee;
	public employee: Employee;
	public saveButtonDisabled: boolean = false;

  @Input() employee: Employee;
  constructor() {
   }

  ngOnInit(): void {
  }

}
