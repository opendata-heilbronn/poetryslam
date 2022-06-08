import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoetsComponent } from './admin-poets.component';

describe('AdminPoetsComponent', () => {
  let component: AdminPoetsComponent;
  let fixture: ComponentFixture<AdminPoetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPoetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
