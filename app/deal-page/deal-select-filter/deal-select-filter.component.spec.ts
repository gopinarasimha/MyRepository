import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSelectFilterComponent } from './deal-select-filter.component';

describe('DealSelectFilterComponent', () => {
  let component: DealSelectFilterComponent;
  let fixture: ComponentFixture<DealSelectFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSelectFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
