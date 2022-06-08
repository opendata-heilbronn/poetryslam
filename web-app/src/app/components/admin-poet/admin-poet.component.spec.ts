import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoetComponent } from './admin-poet.component';

describe('AdminPoetComponent', () => {
  let component: AdminPoetComponent;
  let fixture: ComponentFixture<AdminPoetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPoetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
