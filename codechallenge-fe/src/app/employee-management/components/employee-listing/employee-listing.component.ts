import { Component, OnInit } from '@angular/core';
import { SearchType } from 'src/app/shared/enums/search_type';
import { SearchTag } from '../../../shared/models/search-tag-interface';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {
	public advancedSearchCriteria: any;
  constructor() { }
  public searchTags: SearchTag[];
  public searchType: SearchType;
  ngOnInit(): void {
  }

  onNewUserAdded() {

  }
  onSearchByKeywordClick(search: any) {

  }

  onAdvancedSearchClick() {

  }

  onAdvancedSearchResetClick() {

  }

  public updateSearchTags(updatedTags: SearchTag[]) {
		if (this.searchTags) {
			this.searchTags.forEach(tag => {
        let foundTag = updatedTags.find(t => t.Value == tag.Value);
        if(foundTag){
        tag.HasResult = foundTag.HasResult;
        }
      });
		}
	}

}
