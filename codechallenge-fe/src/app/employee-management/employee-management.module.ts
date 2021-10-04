import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeTableListingComponent } from './components/employee-table-listing/employee-table-listing.component';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeCardListingComponent } from './components/employee-card-listing/employee-card-listing.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeAdvancedSearchComponent } from './components/employee-advanced-search/employee-advanced-search.component';


@NgModule({
  declarations: [    
    EmployeeListingComponent,
    EmployeeCardComponent,
    EmployeeTableListingComponent,
    EmployeeCardListingComponent,
    EmployeeDetailsComponent,
    EmployeeAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
