import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtfilloNewComponent } from './protfillo-new.component';

describe('ProtfilloNewComponent', () => {
  let component: ProtfilloNewComponent;
  let fixture: ComponentFixture<ProtfilloNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtfilloNewComponent]
    });
    fixture = TestBed.createComponent(ProtfilloNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
