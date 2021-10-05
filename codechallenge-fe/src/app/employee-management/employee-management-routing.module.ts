import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';

const routes: Routes = [
  {
		path: '', component: EmployeeListingComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
