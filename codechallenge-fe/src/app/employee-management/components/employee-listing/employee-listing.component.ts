import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchType } from 'src/app/shared/enums/search_type';
import { SearchTag } from '../../../shared/models/search-tag-interface';
import { EmployeeAdvancedSearchComponent } from '../employee-advanced-search/employee-advanced-search.component';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {
  @ViewChild(EmployeeAdvancedSearchComponent, { static: false }) advancedSearchComp: EmployeeAdvancedSearchComponent;

  public searchTags: SearchTag[];
  public searchType: SearchType;
  public showNewUser: boolean = false;
  public advancedSearchCriteria: any;

  constructor() { }
  
  ngOnInit(): void {
  }

  onNewUserAdded() {

  }
  onSearchByKeywordClick(search: any) {
    this.searchType = SearchType.normal;
    this.updateSearchTags(search);

  }

  onAdvancedSearchClick() {
    this.advancedSearchCriteria = this.advancedSearchComp.getValues();
		this.searchType = SearchType.advanced;
  }

  onAdvancedSearchResetClick() {

  }

  public updateSearchTags(updatedTags: SearchTag[]) {
    this.searchTags = [];
    this.searchTags = updatedTags;
  }
  toggleAddUser(){
    this.showNewUser = !this.showNewUser;
  }

}
