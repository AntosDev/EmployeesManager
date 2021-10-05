import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeCardListingComponent } from './components/employee-card-listing/employee-card-listing.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeAdvancedSearchComponent } from './components/employee-advanced-search/employee-advanced-search.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [    
    EmployeeListingComponent,
    EmployeeCardComponent,
    EmployeeCardListingComponent,
    EmployeeDetailsComponent,
    EmployeeAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
