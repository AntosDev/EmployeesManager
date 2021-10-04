import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchTag } from '../search/search-tag-interface';

@Component({
	selector: 'app-advanced-search',
	templateUrl: './advanced-search.component.html',
	styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
	@Input() placeholder: string = "keyword...";
	@Input() set searchTags(val: SearchTag[]) {
		if (this._tags != val) {
			this._tags = val;
			this.searchTagsChange.emit(this._tags);
		}
	};
	@Output() onSearchByKeywordClick: EventEmitter<SearchTag[]> = new EventEmitter();
	@Output() onAdvancedSearchClick: EventEmitter<any> = new EventEmitter();
	@Output() onAdvancedSearchResetClick: EventEmitter<any> = new EventEmitter();
	@Output() searchTagsChange: EventEmitter<SearchTag[]> = new EventEmitter();

	public searchByKeywordInput: string; // basic search input model
	public isAdvancedSearchBoxVisible: boolean = false;
	private _tags: SearchTag[] = []; // available search keywords

	get searchTags(): SearchTag[] {
		return this._tags;
	}


	constructor() { }

	ngOnInit() {
	}

	public setSearchTags(searchTags: SearchTag[]) {
		this.searchTags = searchTags;
		this.searchByKeywordInput = searchTags.map(t => t.Value).join(" ");
	}

	public searchByKeywordClick(): void {
		this.searchTags = [];
		if (this.searchByKeywordInput) {
			let tempTags: string[] = this.searchByKeywordInput.split(" ");
			for (var i = 0; i < tempTags.length; i++) {
				if (tempTags[i] !== "") {
					// check if the keywords contain "level" keywords , then combine it with the next letter to be one keword
					if (tempTags[i].toLowerCase() === "level") {
						this.searchTags.push({ Value: tempTags[i] + " " + (tempTags[i + 1] ? tempTags[i + 1] : ""), HasResult: false });
						i++;
					} else {
						this.searchTags.push({ Value: tempTags[i], HasResult: true });
					}
				}
			}
		}

		this.onSearchByKeywordClick.emit(this.searchTags);
	}

	//remove search tags and update the result
	public removeSearchTag(tagIndex: number): void {
		//this.searchByKeywordInput = this.searchByKeywordInput.replace(this.searchTags[tagIndex].Value, "").trim();
		this.searchByKeywordInput = this.searchByKeywordInput.replace("  ", " ").trim();
		this.searchTags.splice(tagIndex, 1);
		this.searchByKeywordInput = this.searchTags.map(t => t.Value).join(" ");
		this.onSearchByKeywordClick.emit(this.searchTags);
	}

	//on advanced search button click, get the values from the dynamic component and pass it to output click event
	public advancedSearchClick(): void {
		this.isAdvancedSearchBoxVisible = false;
		this.searchTags = [];
		this.searchByKeywordInput = "";
		this.onAdvancedSearchClick.emit();
	}

	//clear the advnaced search box fields values by calling the componnet clear method
	public onResetAdvnacedSearchClick(): void {
		this.onAdvancedSearchResetClick.emit();
	}
}
