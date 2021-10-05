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

	@Input() searchType: SearchType = SearchType.normal;
	@Input() searchTags: SearchTag[];
	@Input() advancedSearchCriteria: any;


	public employees: Employee[];
	public searching: boolean;

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
		this.employees = [];
		this.searching = true;
		let tags = this.searchTags.map(t => t.Value);
		let keyword = tags.join(" ");

		this.employeesService.searchEmployees(keyword).subscribe(response => {
			this.searching = false;
			this.advancedSearchCriteria = null;
			this.employees = response;
		});
	}

	private getAdvancedSearchData() {
		this.employees = [];
		this.searching = true;
		let tags = this.searchTags.map(t => t.Value);
		let keyword = tags.join(" ");

		this.employeesService.advancedSearchEmployees(this.advancedSearchCriteria).subscribe(response => {
			this.searching = false;
			this.advancedSearchCriteria = null;
			this.employees = response;
		});
	}

}
