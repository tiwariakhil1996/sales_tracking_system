import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubcategoryComponent } from './category-subcategory.component';

describe('CategorySubcategoryComponent', () => {
  let component: CategorySubcategoryComponent;
  let fixture: ComponentFixture<CategorySubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
