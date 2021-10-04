import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdvancedSearchComponent } from './employee-advanced-search.component';

describe('EmployeeAdvancedSearchComponent', () => {
  let component: EmployeeAdvancedSearchComponent;
  let fixture: ComponentFixture<EmployeeAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
