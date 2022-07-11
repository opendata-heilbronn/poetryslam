import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionEventNameAnnouncementComponent } from './projection-event-name-announcement.component';

describe('ProjectionEventNameAnnouncementComponent', () => {
  let component: ProjectionEventNameAnnouncementComponent;
  let fixture: ComponentFixture<ProjectionEventNameAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionEventNameAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionEventNameAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
