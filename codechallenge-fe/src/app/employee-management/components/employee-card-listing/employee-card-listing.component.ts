import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { SearchType } from 'src/app/shared/enums/search_type';
import { SearchTag } from 'src/app/shared/models/search-tag-interface';

@Component({
  selector: 'app-employee-card-listing',
  templateUrl: './employee-card-listing.component.html',
  styleUrls: ['./employee-card-listing.component.css']
})
export class EmployeeCardListingComponent implements OnInit {

	@Input() searchType: SearchType;
	@Input() searchTags: SearchTag[];
	@Input() advancedSearchCriteria: any;

  public employees: Employee[];
  public searching:boolean;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  
	ngOnChanges() {
		this.refreshData();
  }

  public onEmployeeClickHandler(employee: any) {
    //this.router.navigate([RouteNameEnum.UserManagement, RouteNameEnum.UserDetails, userResult.id], {
    //  state: {
    //    searchTags: this.searchTags,
    //    advancedSearchCriteria: this.advancedSearchCriteria,
    //    searchResults: this.userSearchResults,
    //    listingType: ListingType.grid
    //  }
    //});
  }

	public refreshData() {
		if (this.searchType == SearchType.normal) {
			this.getSearchByKeywordData();
		} else if (this.searchType == SearchType.advanced) {
			this.getAdvancedSearchData();
		}
	}

  private getSearchByKeywordData() {
		this.employees = [];
		this.searching = true;
		let options: any = {
			tags: this.searchTags,
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
		// this.searching = true;
		// this.searchTags = [];
		// this.searchResults = null;

		// let levels: string[] = [];
		// if (this.advancedSearchCriteria && this.advancedSearchCriteria.levels) {
		// 	this.advancedSearchCriteria.levels.forEach(level => levels.push(...level.LevelNames))
		// }

		// let options: UserSearchOptions = {
		// 	tags: [],
		// 	take: 4,
		// 	skip: 0,
		// 	isGrouped: true,
		// 	order: null,
		// 	filters: {
		// 		firstName: this.advancedSearchCriteria.firstName,
		// 		lastName: this.advancedSearchCriteria.lastName,
		// 		middleName: this.advancedSearchCriteria.middleName,
		// 		username: this.advancedSearchCriteria.username,
		// 		isDisabled: this.advancedSearchCriteria.isDisabled,
		// 		schoolExternalId: this.advancedSearchCriteria.school ? this.advancedSearchCriteria.school.SchoolSDPId : null,
		// 		levels: levels,
		// 		roleId: this.advancedSearchCriteria.role ? this.advancedSearchCriteria.role.Id : null,
		// 		schoolId: null,
		// 		schoolName: null
		// 	}
		// };
		// this.employeesService.advancedSearchUsers(options).subscribe(response => {
		// 	this.searching = false;
		// 	this.searchExecuted = true;
		// 	this.searchResults = response.searchResults;
		// });
	}

}
