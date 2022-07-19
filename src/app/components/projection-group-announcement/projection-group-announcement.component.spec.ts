import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGroupAnnouncementComponent } from './projection-group-announcement.component';

describe('ProjectionGroupAnnouncementComponent', () => {
  let component: ProjectionGroupAnnouncementComponent;
  let fixture: ComponentFixture<ProjectionGroupAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionGroupAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionGroupAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
