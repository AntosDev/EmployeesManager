import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableListingComponent } from './employee-table-listing.component';

describe('EmployeeTableListingComponent', () => {
  let component: EmployeeTableListingComponent;
  let fixture: ComponentFixture<EmployeeTableListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTableListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTableListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
