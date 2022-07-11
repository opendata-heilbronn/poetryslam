import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGroupScoresComponent } from './projection-group-scores.component';

describe('ProjectionGroupScoresComponent', () => {
  let component: ProjectionGroupScoresComponent;
  let fixture: ComponentFixture<ProjectionGroupScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionGroupScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionGroupScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
