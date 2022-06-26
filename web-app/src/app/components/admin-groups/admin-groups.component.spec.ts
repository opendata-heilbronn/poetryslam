import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupsComponent } from './admin-groups.component';

describe('AdminGroupsComponent', () => {
  let component: AdminGroupsComponent;
  let fixture: ComponentFixture<AdminGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
