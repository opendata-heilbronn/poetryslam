import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoundsComponent } from './admin-rounds.component';

describe('AdminRoundsComponent', () => {
  let component: AdminRoundsComponent;
  let fixture: ComponentFixture<AdminRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
