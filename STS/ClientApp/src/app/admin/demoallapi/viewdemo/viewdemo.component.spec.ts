import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdemoComponent } from './viewdemo.component';

describe('ViewdemoComponent', () => {
  let component: ViewdemoComponent;
  let fixture: ComponentFixture<ViewdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
