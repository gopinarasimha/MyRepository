import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCaptureItemComponent } from './name-capture-item.component';

describe('NameCaptureItemComponent', () => {
  let component: NameCaptureItemComponent;
  let fixture: ComponentFixture<NameCaptureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCaptureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCaptureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
