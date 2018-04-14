import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSelectFilterSearchComponent } from './deal-select-filter-search.component';

describe('DealSelectFilterSearchComponent', () => {
  let component: DealSelectFilterSearchComponent;
  let fixture: ComponentFixture<DealSelectFilterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSelectFilterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSelectFilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
