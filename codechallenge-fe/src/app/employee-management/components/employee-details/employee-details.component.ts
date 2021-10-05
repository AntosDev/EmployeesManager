import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { GenderEnum } from '../../../shared/enums/gender-enum';
import { LookupValidation } from '../../../shared/models/lookup-validation';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  public employee: Employee = new Employee();
  public saveButtonDisabled: boolean = false;
  public genders = [{
    Name: "Male",
    Id: GenderEnum.Male
  }, {
    Name: "Female",
    Id: GenderEnum.Female
  }]
  public departments = [];
  public employmentTypes = [];
  public jobtitles = [];
  public placeholder = "Please Select";

  @Input() originalEmployee: Employee;
  @Input() newUser: boolean;
  @ViewChildren(TextInputComponent) textInputs: QueryList<TextInputComponent>;

  constructor(private empService: EmployeesService) {
  }

  ngOnInit(): void {
    forkJoin(
      this.empService.getDepartments(),
      this.empService.getEmploymentTypes(),
      this.empService.getjobTitles()
    ).subscribe(results => {
      this.departments = results[0];
      this.employmentTypes = results[1];
      this.jobtitles = results[2];
    });
  }

  isValid(): boolean {
    if (!this.textInputs) {
      return false;
    }
    let areTextInputsValid = this.textInputs.map(input => input.isValid()).reduce((p, c) => p && c);
    return areTextInputsValid
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

  getAvatarSource() {
    if (this.originalEmployee) {
      switch (this.originalEmployee.gender.toLowerCase()) {
        case GenderEnum.Male.toString().toLowerCase():
          return "assets/images/male-avatar.svg"
        case GenderEnum.Female.toString().toLowerCase():
          return "assets/images/female-avatar.svg"
        default:
          return "assets/images/default-avatar.svg"
      }
    } return "assets/images/default-avatar.svg";
  }

  // emailValidation(): (email: string) => Observable<LookupValidation> {
  //   //return this.getValidateEmailFn.bind(this);

  // }

  //getValidateEmailFn(email: string): Observable<LookupValidation> {
  //  return this.empService.validateEmail(email, this.originalEmployee.id);
  //}

  onGenderChange(event: any) {
    this.employee.gender = event.values[0].name.toString().toLowerCase();
  }


  onDepartmentChange(event: any) {
    this.employee.departmentId = event.values[0].id;
  }

  onEmploymentTypeChange(event: any) {
    this.employee.employmentTypeId = event.values[0].id;
  }

  onJobTitleChange(event: any) {
    this.employee.jobTitleId = event.values[0].id;
  }
  isDataEntryDisabled() {
    return !this.newUser;
  }

}
