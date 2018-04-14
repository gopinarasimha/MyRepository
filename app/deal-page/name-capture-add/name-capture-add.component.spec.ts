import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCaptureAddComponent } from './name-capture-add.component';

describe('NameCaptureAddComponent', () => {
  let component: NameCaptureAddComponent;
  let fixture: ComponentFixture<NameCaptureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCaptureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCaptureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
