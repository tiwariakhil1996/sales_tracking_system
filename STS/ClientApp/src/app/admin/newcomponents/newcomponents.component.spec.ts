import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomponentsComponent } from './newcomponents.component';

describe('NewcomponentsComponent', () => {
  let component: NewcomponentsComponent;
  let fixture: ComponentFixture<NewcomponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcomponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
