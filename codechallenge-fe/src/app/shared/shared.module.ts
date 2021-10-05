import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { AppConfigService } from './services/app-config.service';
@NgModule({
	declarations: [
		MultiSelectComponent,
		AdvancedSearchComponent,
		TextInputComponent,
		ButtonComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		HttpClientModule
	],
	providers: [
		AppConfigService
	],
	exports: [
		MultiSelectComponent,
		AdvancedSearchComponent,
		TextInputComponent,
		ButtonComponent
	],
	entryComponents: [
	]
})
export class SharedModule { }
