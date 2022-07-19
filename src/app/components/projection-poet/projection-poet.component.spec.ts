import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionPoetComponent } from './projection-poet.component';

describe('ProjectionPoetComponent', () => {
  let component: ProjectionPoetComponent;
  let fixture: ComponentFixture<ProjectionPoetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionPoetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionPoetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
