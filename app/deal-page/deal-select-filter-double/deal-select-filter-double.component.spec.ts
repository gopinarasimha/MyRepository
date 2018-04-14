import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaSelectFilterDoubleComponent } from './deal-select-filter-double.component';

describe('DeaSelectFilterDoubleComponent', () => {
  let component: DeaSelectFilterDoubleComponent;
  let fixture: ComponentFixture<DeaSelectFilterDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaSelectFilterDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaSelectFilterDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
