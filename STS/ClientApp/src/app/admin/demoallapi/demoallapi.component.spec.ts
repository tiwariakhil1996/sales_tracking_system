import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoallapiComponent } from './demoallapi.component';

describe('DemoallapiComponent', () => {
  let component: DemoallapiComponent;
  let fixture: ComponentFixture<DemoallapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoallapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoallapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
