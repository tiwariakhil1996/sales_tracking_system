import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddemoComponent } from './adddemo.component';

describe('AdddemoComponent', () => {
  let component: AdddemoComponent;
  let fixture: ComponentFixture<AdddemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
