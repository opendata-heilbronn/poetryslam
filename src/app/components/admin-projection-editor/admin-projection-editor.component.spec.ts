import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectionEditorComponent } from './admin-projection-editor.component';

describe('AdminProjectionEditorComponent', () => {
  let component: AdminProjectionEditorComponent;
  let fixture: ComponentFixture<AdminProjectionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectionEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
