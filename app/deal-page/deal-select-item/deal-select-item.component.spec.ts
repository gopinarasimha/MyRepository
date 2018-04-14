import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSelectItemComponent } from './deal-select-item.component';

describe('DealSelectItemComponent', () => {
  let component: DealSelectItemComponent;
  let fixture: ComponentFixture<DealSelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSelectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
