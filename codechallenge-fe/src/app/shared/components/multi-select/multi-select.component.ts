import { Component, OnInit, Input, HostListener, ElementRef, NgZone, forwardRef, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectionChangedArgs } from './models/selection-changed-args';

@Component({
	selector: 'app-multi-select',
	templateUrl: './multi-select.component.html',
	styleUrls: ['./multi-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultiSelectComponent),
			multi: true
		}]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
	private _options: Array<any> = [];
	public isOpen: boolean = false;
	public isOpenTemp: boolean = false;
	public touched = false;

	onChangeCallback: (value: any) => void;
	@Output() onCloseCallback: EventEmitter<any> = new EventEmitter();
	onTouchedCallback: () => void;

	@Input() public set options(options: Array<any>) {
		this._options = options;
		this.selectedValues = [];
	}

	public get options(): Array<any> {
		return this._options;
	}
	@Input() public required: boolean = false;
	@Input() public label: string;
	@Input() public textField: string;
	@Input() public valueField: string;
	@Input() public disabled: boolean = false;
	@Input() public placeholder: string = "select..";
	@Input() public loading: boolean = false;
	@Input() public allOptionText: string = "All";
	@Input() public isMultiSelectionEnabled: boolean = true;
	@Input() public clearValueAllowed: boolean = true;
	@Input() public hasError: boolean = false;
	@Input() public selectedItems: any[];

	@Output() selectionChanged = new EventEmitter<SelectionChangedArgs>();

	public selectedValues: any[] = [];
	public get selectedOptionsLabel(): string {
		let retVal: string = '';
		if (this.selectedValues.length > 0) {
			let labels: Array<string> = [];
			for (var i = 0; i < this.selectedValues.length; i++) {
				labels.push(this.getOptionLabel(this.selectedValues[i]));
			}
			retVal = labels.join(', ');
		}
		return retVal;
	}

	constructor(private eRef: ElementRef, private zone: NgZone) {

	}

	public setSelectedItems(items: any[]): void {
		setTimeout(() => {
			if (items) {
				this.selectedValues = items;
				this.writeValue(this.selectedValues);
			}
		});
	}

	public isValid(): boolean{
		return !this.required || (this.required && this.selectedValues && this.selectedValues.length > 0);
	}

	ngOnInit() {
		if (this.selectedItems) {
			this.selectedValues = this.selectedItems;
		}
	}

	writeValue(obj: any): void {
		if (obj) {
			this.selectedValues = obj;
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	@HostListener('document:click', ['$event'])
	clickout(event) {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.isOpen = false;
			this.notifyComboClosed();
		}
	}

	private getOptionLabel(option: any) {
		if (option && this.textField in option) {
			return option[this.textField];
		}
		return '';
	}

	public toggleSelectPanelVisibility() {
		if (!this.loading && !this.disabled) {
			this.isOpen = !this.isOpen;

			if (!this.isOpen) {
				this.notifyComboClosed();
			} else {
				this.isOpenTemp = true;
			}
		}
	}

	public clearSelection() {
		this.selectedValues = new Array<any>();
		this.notifySelectionChanged();
		this.notifyComboClosed();
	}

	private notifySelectionChanged() {
		this.touched = true;
		this.selectionChanged.emit(new SelectionChangedArgs(this.selectedValues));
	}

	private notifyComboClosed() {
		if (this.isMultiSelectionEnabled && this.isOpenTemp) {
			this.onCloseCallback.emit(new SelectionChangedArgs(this.selectedValues));
			this.isOpenTemp = false;
		}
	}

	private isOptionSelected(option) {
		return this.getSelectedOptionIndex(option) > -1;
	}

	private onOptionClick(option) {
		let index = this.getSelectedOptionIndex(option);
		let valueChanged = false;
		if (index > -1) {
			if (this.clearValueAllowed || (!this.clearValueAllowed && this.isMultiSelectionEnabled)) {
				this.selectedValues.splice(index, 1);
				valueChanged = true;
			}
		} else {
			if (!this.isMultiSelectionEnabled) {
				this.selectedValues = new Array<any>();
			}
			this.selectedValues.push(option);
			valueChanged = true;
		}
		if (valueChanged) {
			this.notifySelectionChanged();
			if (!this.isMultiSelectionEnabled) {
				this.close();
			}
		}
	}

	private close(): void {
		this.isOpen = false;
		this.notifyComboClosed();
	}

	private getSelectedOptionIndex(option): number {
		let index: number = this.selectedValues.findIndex(i => i[this.valueField] == option[this.valueField]);
		return index;
	}

	private isAllOptionSelected(): boolean {
		return this.selectedValues.length == this.options.length;
	}

	private onAllOptionClick(): void {
		if (this.isAllOptionSelected()) {
			this.clearSelection();
		} else {
			this.selectedValues = new Array<any>();
			this.selectedValues = Array.from(this.options);
			this.notifySelectionChanged();
		}
	}
}
