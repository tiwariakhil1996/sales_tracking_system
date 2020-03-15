import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSalesComponent } from './forgot-password-sales.component';

describe('ForgotPasswordSalesComponent', () => {
  let component: ForgotPasswordSalesComponent;
  let fixture: ComponentFixture<ForgotPasswordSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
