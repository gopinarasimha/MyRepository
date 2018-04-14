import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsListThumbnailComponent } from './docs-list-thumbnail.component';

describe('DocsListThumbnailComponent', () => {
  let component: DocsListThumbnailComponent;
  let fixture: ComponentFixture<DocsListThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsListThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsListThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
