import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';

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
	constructor(private empService: EmployeesService) {
	}

	ngOnInit(): void {
	}

	addEmployee() {
		this.saveButtonDisabled = true;
		this.empService.addEmpoloyee(this.employee).subscribe(user => {
			// this.toastrService.showSuccess("", "User Added Successfully");
			this.saveButtonDisabled = false;
		}, error => {
			this.saveButtonDisabled = false;
			// this.toastrService.showError("", error.error);
		});
	}

}
