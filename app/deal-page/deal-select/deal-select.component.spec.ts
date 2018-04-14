import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSelectComponent } from './deal-select.component';

describe('DealSelectComponent', () => {
  let component: DealSelectComponent;
  let fixture: ComponentFixture<DealSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
