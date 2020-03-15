import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSalesComponent } from './reset-password-sales.component';

describe('ResetPasswordSalesComponent', () => {
  let component: ResetPasswordSalesComponent;
  let fixture: ComponentFixture<ResetPasswordSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
