import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-card-listing',
  templateUrl: './employee-card-listing.component.html',
  styleUrls: ['./employee-card-listing.component.css']
})
export class EmployeeCardListingComponent implements OnInit {

	@Input() searchType: SearchType;
	@Input() searchKeyword: string;
	@Input() advancedSearchCriteria: EmployeeAdvancedSearchCriteria;

  public employees: Employee[];
  public searching:boolean;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  
	ngOnChanges() {
		this.refreshData();
	}

	public refreshData() {
		if (this.searchType == SearchType.normal) {
			this.getSearchByKeywordData();
		} else if (this.searchType == SearchType.advanced) {
			this.getAdvancedSearchData();
		}
	}

  private getSearchByKeywordData() {
		this.employees = null;
		this.searching = true;
		let options: EmployeeSearchOptions = {
			keyword: this.searchKeyword,
			order: null,
			filters: null
		};
		this.employeesService.searchEmployees(options).subscribe(response => {
			this.searching = false;
			this.advancedSearchCriteria = null;
			this.employees = response.searchResults;
		});
	}

	private getAdvancedSearchData() {
		this.searching = true;
		this.searchTags = null;
		this.searchResults = null;

		let levels: string[] = [];
		if (this.advancedSearchCriteria && this.advancedSearchCriteria.levels) {
			this.advancedSearchCriteria.levels.forEach(level => levels.push(...level.LevelNames))
		}

		let options: UserSearchOptions = {
			tags: [],
			take: 4,
			skip: 0,
			isGrouped: true,
			order: null,
			filters: {
				firstName: this.advancedSearchCriteria.firstName,
				lastName: this.advancedSearchCriteria.lastName,
				middleName: this.advancedSearchCriteria.middleName,
				username: this.advancedSearchCriteria.username,
				isDisabled: this.advancedSearchCriteria.isDisabled,
				schoolExternalId: this.advancedSearchCriteria.school ? this.advancedSearchCriteria.school.SchoolSDPId : null,
				levels: levels,
				roleId: this.advancedSearchCriteria.role ? this.advancedSearchCriteria.role.Id : null,
				schoolId: null,
				schoolName: null
			}
		};
		this.userManagementService.advancedSearchUsers(options).subscribe(response => {
			this.searching = false;
			this.searchExecuted = true;
			this.searchResults = response.searchResults;
		});
	}

}
