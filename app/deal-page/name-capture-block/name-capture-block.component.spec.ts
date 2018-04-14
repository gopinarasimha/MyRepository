import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCaptureBlockComponent } from './name-capture-block.component';

describe('NameCaptureBlockComponent', () => {
  let component: NameCaptureBlockComponent;
  let fixture: ComponentFixture<NameCaptureBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCaptureBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCaptureBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
