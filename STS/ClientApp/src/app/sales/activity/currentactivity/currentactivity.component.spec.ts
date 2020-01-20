import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentactivityComponent } from './currentactivity.component';

describe('CurrentactivityComponent', () => {
  let component: CurrentactivityComponent;
  let fixture: ComponentFixture<CurrentactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
