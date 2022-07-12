import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionPoetScoresComponent } from './projection-poet-scores.component';

describe('ProjectionPoetScoresComponent', () => {
  let component: ProjectionPoetScoresComponent;
  let fixture: ComponentFixture<ProjectionPoetScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionPoetScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionPoetScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
