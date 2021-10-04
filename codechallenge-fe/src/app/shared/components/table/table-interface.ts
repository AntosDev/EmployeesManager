import { Observable, ReplaySubject } from 'rxjs';

export enum ColumnType {
	text = 'text',
	image = 'image',
	date = "date"
}

export interface ColumnSettings {
	field: string;
	title: string;
	type: ColumnType;
	width?: number;
	altTextField?: string,
	isSortable: boolean
}

export interface TableSettings {
	columnSettings: ColumnSettings[],// this will hold the table column header name and it data key
	isSelectable: boolean,
	allowDelete: boolean,
	allowEdit: boolean,
	deleteConfirmation?: DeleteConfirmation,
	getDataOnInit: boolean, // whether to call the get data once the component initialized or not
	getDataCallback: (dataArgs: DataArgs) => void,
	defaultRecordsPerPage?: 5 | 10 | 25 | 50 | 100,
	isServerSideRendering: boolean
}

export interface DeleteConfirmation {
	title: string,
	body: string,
	confirmButtonText?: string,
	rejectButtonText?: string
	successfulDeleteNotification?: string;
}

export interface DeleteArgs {
	/**
	 * The data Item to be deleted
	 */
	data: any;
	/**
	 * The grid wait until this observable is resolved.
	 * If the result is false the operation will be canceled
	 **/
	continue: (success: boolean) => void
}

export interface DataArgs {
	data: Observable<TableResult>;
}

export interface TableSorting {
	dir: string,
	prop: string
}

export interface TableResult {
	data: any[],
	totalCount
}
