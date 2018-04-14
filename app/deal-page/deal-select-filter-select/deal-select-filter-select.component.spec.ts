import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSelectFilterSelectComponent } from './deal-select-filter-select.component';

describe('DealSelectFilterSelectComponent', () => {
  let component: DealSelectFilterSelectComponent;
  let fixture: ComponentFixture<DealSelectFilterSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSelectFilterSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSelectFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
