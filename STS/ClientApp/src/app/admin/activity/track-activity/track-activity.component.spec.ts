import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackActivityComponent } from './track-activity.component';

describe('TrackActivityComponent', () => {
  let component: TrackActivityComponent;
  let fixture: ComponentFixture<TrackActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
