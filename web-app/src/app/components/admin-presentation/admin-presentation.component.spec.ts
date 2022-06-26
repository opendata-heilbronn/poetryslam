import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentationComponent } from './admin-presentation.component';

describe('AdminPresentationComponent', () => {
  let component: AdminPresentationComponent;
  let fixture: ComponentFixture<AdminPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
