import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LookupValidation } from '../../models/lookup-validation';

@Component({
	selector: 'app-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
	@Input() disabled: boolean = false;
	@Input() label: string = "";
	@Input() text: string;
	@Input() placeholder: string = "";
	@Input() maxLength: number;
	@Input() required: boolean = false;
	@Input() isEmail: boolean = false;
	@Input() lookupValidation: (string: string) => Observable<LookupValidation>;
	@Output() textChange = new EventEmitter<string>();

	public isLookupValid: boolean = true;
	public lookupValidationPending: boolean = false;
	public touched: boolean = false;
	public validationMessage: string;

	public showValidation: boolean;
	private lookupValidationSub: Subscription;
	constructor() { }

	ngOnInit() {
	}

	public isValid(): boolean {
		let isLookupValid = !this.lookupValidation || (!this.lookupValidationPending && this.isLookupValid);
		let isEmailValid = !this.isEmail || (this.isEmail && this.text != null && this.text != '' && this.validateEmail(this.text));
		let isRequiredValid = !this.required || (this.required && this.text != null && this.text != "");
		let isMaxLengthValid = !this.maxLength || !this.text ||  this.text.length <= this.maxLength;
		return isLookupValid && isEmailValid && isRequiredValid && isMaxLengthValid;
	}

	onChange() {
		this.showValidation = false;
		this.touched = true;
		if (this.lookupValidation != null) {
			this.lookupValidationPending = true;
		}		
		this.textChange.emit(this.text);
	}

	onBlur() {
		this.text = this.text ? this.text.trim() : this.text;
		this.textChange.emit(this.text);
		
		if (!this.isValid() && this.touched) {
			this.validationMessage = '';
			if (this.maxLength && this.text.length > this.maxLength) {
				this.displayValidation("Should not exceed " + this.maxLength + " charaters.");
			}
			else if (this.isEmail && !this.validateEmail(this.text)) {
				this.displayValidation("This is not a valid email");
			} else if (this.lookupValidation) {
				if (this.lookupValidationSub) {
					this.lookupValidationSub.unsubscribe();
				}
				this.lookupValidationSub = this.lookupValidation(this.text).subscribe(result => {
					if (result.isValid) {
						this.isLookupValid = true;
						this.validationMessage = "";
						this.showValidation = false;
					}
					else {
						this.isLookupValid = false;
						this.displayValidation(result.validationMessage);
					}
					this.lookupValidationPending = false;
				});
			}
			else if (this.required && (this.text == null || this.text == "")) {
				this.displayValidation("This field is required");
			}
			else {
				this.displayValidation("")
			}
		}
	}

	private displayValidation(message: string) {
		this.validationMessage = message;
		this.showValidation = true;
	}

	private validateEmail(email: string) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}


}
