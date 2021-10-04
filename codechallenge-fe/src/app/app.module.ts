import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancedSearchComponent } from './shared/components/advanced-search/advanced-search.component';
import { TextInputComponent } from './shared/components/text-input/text-input.component';
import { MultiSelectComponent } from './shared/components/multi-select/multi-select.component';
import { TableComponent } from './shared/components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvancedSearchComponent,
    TextInputComponent,
    MultiSelectComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
