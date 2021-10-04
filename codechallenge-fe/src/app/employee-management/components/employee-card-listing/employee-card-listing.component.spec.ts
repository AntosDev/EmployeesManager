import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCardListingComponent } from './employee-card-listing.component';

describe('EmployeeCardListingComponent', () => {
  let component: EmployeeCardListingComponent;
  let fixture: ComponentFixture<EmployeeCardListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCardListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
