import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { combineLatest, Observable, of as observableOf, ReplaySubject } from 'rxjs';
import { ColumnType, DeleteArgs, TableSettings, DataArgs, TableSorting } from './table-interface';
import { map, merge, startWith, switchMap, take, takeWhile } from 'rxjs/operators';
import { AlertControllerService } from '../../../services/alert-controller/alert-controller.service';
import { AppToastrService } from '../../services/toastr/app-toastr.service';
import { SharedConstant } from '../../shared-constant';
import { TableService } from '../../services/table/table.service';
import { TableIdentifiers } from '../../constants/table-identifiers';
import { DateFormat } from '../../date-format';
import { CommonHelper } from '../../helpers/common-helper';
import { race } from 'rxjs/internal/observable/race';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {
	private _tableSettings: TableSettings;
	@ViewChild(DatatableComponent, { static: true }) private table: DatatableComponent;

	@Input('tableSettings') set tableSettings(settings: TableSettings) {
		if (settings.defaultRecordsPerPage) {
			this.currentPageLimit = settings.defaultRecordsPerPage;
		}
		this._tableSettings = settings;
	};

	get tableSettings(): TableSettings {
		return this._tableSettings;
	}

	@Input('tableId') tableId: TableIdentifiers;
	@Input() isScrollable: boolean = false;
	@Output('onEditClick') onEditClick: EventEmitter<any> = new EventEmitter<any>();
	@Output('onDeleteClick') onDeleteClick: EventEmitter<DeleteArgs> = new EventEmitter(false);
	@Output('onSelectionChange') onSelectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Output('onRowDoubleClick') onRowDoubleClick: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDataRetrievingOptionsChange: EventEmitter<{ pageLimit: number, sorting: TableSorting[] }> =
		new EventEmitter<any>();

	public pageLimitOptions: number[] = [5, 10, 25, 50, 100];
	public currentPageLimit: number = 10;	// the current default selected page limit
	public tableRows: any[] = [];
	public tableSelectedRows: any[] = [];
	
	public isTableLoading: boolean = false;
	public columnMode = ColumnMode;// ngx datatable column modes
	public selectionType = SelectionType;// ngx datatable selection types
	public columnTypes = ColumnType;
	private isViewActive: boolean = true;
	public dateFormat: typeof DateFormat = DateFormat;
	public selectAllCheckboxes: boolean[] = [];
	public selectedRowsCheckboxes: boolean[] = [];
	public currentPageNumber: number = 0;
	public totalElementsNumber: number = 0;

	public get recordsToShow(): number {
		return this.currentPageLimit;
	}

	public get recordsToSkip(): number {
		return this.currentPageLimit * (this.table.offset);
	}

	private onPageLimitChange: EventEmitter<any> = new EventEmitter<any>();

	constructor(private _alertCtrl: AlertControllerService,
		private appToasterService: AppToastrService,
		private tableService: TableService) { }

	ngOnInit() {
		if (this.tableSettings.isServerSideRendering) {
			this.handleDataRetrievingOptionsChange();
		}

		this.handleTableRefresh();
		//check if the data should be loaded on initialization of the component
		if (this.tableSettings.getDataOnInit) {
			this.updateData();
		}
	}

	//load table data using subscription to getData input method
	public updateData(forceResetPageOffset: boolean = false): void {
		this.isTableLoading = true;

		let dataArgs: DataArgs = {
			data: observableOf(null)
		};

		if (this.tableSettings) {

			if (this.tableSettings.isServerSideRendering) {
				this.table.offset = forceResetPageOffset ? 0 : this.table.offset ? this.table.offset : 0;
			}

			this.tableSettings.getDataCallback(dataArgs);
			dataArgs.data
				.pipe(takeWhile(() => this.isViewActive))
				.subscribe(result => {
					this.resetTableSelection();
					if (result) {
						if (this.tableSettings.isServerSideRendering) {
							this.totalElementsNumber = result.totalCount;
							this.tableRows = result.data;
						} else {
							this.totalElementsNumber = result.data.length;
							this.tableRows = result.data;
							this.table.offset = 0;
						}
						this.isTableLoading = false;
					}
				});
		}
	}

	//get selected items
	public getSelectedItems(): any[] {
		return this.tableSelectedRows;
	}

	// emit selected row once the use click on edit
	public onEditRowClick(selectedRow: any): void {
		this.onEditClick.emit(selectedRow);
	}

	public onActivated(event) {
		if (event && event.type && event.type == "dblclick") {
			this.onRowDoubleClick.emit(event.row)
		}
	}

	// show confirmation message on delete , if approved , emit the selected row
	public onDeleteRowClick(selectedRow: any): void {
		var rowIndex = this.tableRows.findIndex(row => row === selectedRow);
		if (rowIndex > -1) {
			this.presentDeleteConfirm().subscribe(result => {
				if (result) { // if the user confirmed the delete operation , then send the item and observable for delete process
					let continueSubject: ReplaySubject<any> = new ReplaySubject(1);
					let deleteArgs: DeleteArgs = {
						continue: (success: boolean) => {
							if (success)
								continueSubject.next(success);
							else {
								continueSubject.error(false);
							}
						},
						data: selectedRow
					};

					this.onDeleteClick.emit(deleteArgs);
					this.isTableLoading = true;
					//wait for the delete operation response
					continueSubject.pipe(
						take(1)
					).subscribe(success => {
						if (success) {
							//remove the row from the table
							this.removeRowFromTable(selectedRow);
							let successfulDeleteNotification = this.tableSettings.deleteConfirmation && this.tableSettings.deleteConfirmation.successfulDeleteNotification ? this.tableSettings.deleteConfirmation.successfulDeleteNotification : SharedConstant.DeletedSuccessfully;
							this.appToasterService.showSuccess("", successfulDeleteNotification);
							this.onSelectionChange.emit(this.tableSelectedRows);
							this.isTableLoading = false;
						} else {
							this.isTableLoading = false;
						}
					}, () => {
						this.isTableLoading = false;
					});
				}
			});
		}
	}

	// update page size
	public handlePageLimitOptionsChange(limit: any): void {
		this.currentPageLimit = parseInt(limit, 10);
		this.table.limit = this.currentPageLimit;
		this.onPageLimitChange.emit();
		this.table.recalculate();
		if (this.table.bodyComponent.temp.length <= 0) {
			this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
		}
		this.resetTableSelection();
	}

	public deleteSelectedRowsAndResetTable(): void {
		this.tableRows = this.tableRows.filter(c => this.tableSelectedRows.indexOf(c) == -1);
		this.isTableLoading = false;
		this.table.recalculate();
		this.resetTableSelection();
	}

	public transformToLocalDate(date: any) {
		var dateString = date.toString();
		return CommonHelper.transformToLocalDate(dateString);
	}

	private handleTableRefresh() {
		this.tableService.onRefreshTable
			.pipe(takeWhile(() => this.isViewActive))
			.subscribe(identifier => {
				if (identifier == this.tableId) {
					this.updateData();
				}
			})
	}

	public onPagerClick(): void {
		setTimeout(() => {
			this.currentPageNumber = this.table.offset;
		});
	}

	// on ticking all rows checkbox , update the rows checkboxes
	public onSelectAllRowsCheckboxClick(): void {
		setTimeout(() => {
			this.currentPageNumber = this.table.offset;// set the current page number
			this.selectAllCheckboxes[this.currentPageNumber] = !this.selectAllCheckboxes[this.currentPageNumber];// toggle the checkbox status
			this.updateAllCheckboxInput();
			this.onSelectionChange.emit(this.tableSelectedRows);
		});
	}

	public onSelectRowCheckboxClick(currentRow: any, rowIndex: number): void {
		this.selectedRowsCheckboxes[rowIndex] = !this.selectedRowsCheckboxes[rowIndex];
		this.updateSelectedRows(rowIndex, currentRow);

		this.recalculateRowSelection();
		this.onSelectionChange.emit(this.tableSelectedRows);
	}

	private updateSelectedRows(rowIndex: number, currentRow: any): void {
		// either to add/ remove the selected row
		if (this.selectedRowsCheckboxes[rowIndex]) {
			this.tableSelectedRows.push(currentRow);
		} else {
			this.tableSelectedRows = this.tableSelectedRows.filter(row => row != currentRow);
		}
	}

	private updateAllCheckboxInput(): void {
		if (this.selectAllCheckboxes[this.currentPageNumber]) { // if its just ckecked , add the page rows to the selected rows variable
			this.tableSelectedRows.push(...this.table.bodyComponent.temp);
			this.updateCurrentPageRowsCheckboxes(true);
		} else {
			// remove the unchecked row from the table selected rows variable
			this.table.bodyComponent.temp.forEach(currentRow => {
				this.tableSelectedRows = this.tableSelectedRows.filter(row => row != currentRow)
			});
			this.updateCurrentPageRowsCheckboxes(false);
		}
	}

	private updateCurrentPageRowsCheckboxes(isChecked: boolean): void {
		for (var rowIndex = 0; rowIndex < this.table.pageSize; rowIndex++) {
			var currentRowIndex = this.currentPageNumber > 0 ? (rowIndex + (this.currentPageNumber * this.table.pageSize)) : rowIndex;
			this.selectedRowsCheckboxes[currentRowIndex] = isChecked;
		}
	}

	private resetTableSelection(): void {
		this.selectedRowsCheckboxes = [];
		this.selectAllCheckboxes = [];
		this.tableSelectedRows = [];
		this.onSelectionChange.emit([]);
	}

	private removeRowFromTable(rowToRemove: any): void {
		var rowIndex = this.tableRows.findIndex(row => row === rowToRemove);
		this.tableRows = this.tableRows.filter(c => c !== rowToRemove);
		this.tableSelectedRows = this.tableSelectedRows.filter(c => c !== rowToRemove);
		this.selectedRowsCheckboxes.splice(rowIndex, 1);
		this.recalculateRowSelection();
	}

	private presentDeleteConfirm(): Observable<boolean> {
		var confirmationTitle = this.tableSettings.deleteConfirmation.title != null ? this.tableSettings.deleteConfirmation.title : "Delete Confirmation";
		var confirmationMessage = this.tableSettings.deleteConfirmation.body ? this.tableSettings.deleteConfirmation.body : "Are you sure you want to delete the selected row ?"
		let confirmButtonText = this.tableSettings.deleteConfirmation.confirmButtonText ? this.tableSettings.deleteConfirmation.confirmButtonText : "Delete";
		let rejectButtonText = this.tableSettings.deleteConfirmation.rejectButtonText ? this.tableSettings.deleteConfirmation.rejectButtonText : "Cancel";
		return this._alertCtrl.presentConfirm(confirmationMessage, confirmationTitle, confirmButtonText, rejectButtonText);
	}

	private recalculateRowSelection(): void {
		// check if all rows are selected , we check the all rows checkbox
		var isAllRowsSelectedIncurrentPageNumber = true;
		for (var rowIndex = 0; rowIndex < this.table.pageSize; rowIndex++) {
			if (rowIndex < this.table.bodyComponent.temp.length) {
				var currentRowIndex = this.currentPageNumber > 0 ? (rowIndex + (this.currentPageNumber * this.table.pageSize)) : rowIndex;
				if (!this.selectedRowsCheckboxes[currentRowIndex]) {
					isAllRowsSelectedIncurrentPageNumber = false;
				}
			}
		}
		this.selectAllCheckboxes[this.currentPageNumber] = isAllRowsSelectedIncurrentPageNumber;
	}

	private handleDataRetrievingOptionsChange() {
		combineLatest(
			this.onPageLimitChange.pipe(startWith(null)),
			this.table.sort.pipe(startWith(null)),
			this.table.page.pipe(startWith(null)))
			.pipe(takeWhile(() => this.isViewActive))
			.subscribe(() => {
				this.onDataRetrievingOptionsChange.emit({
					pageLimit: this.table.limit,
					sorting: this.table.sorts
				});
			});
	}

	ngOnDestroy() {
		this.isViewActive = false;
	}
}
