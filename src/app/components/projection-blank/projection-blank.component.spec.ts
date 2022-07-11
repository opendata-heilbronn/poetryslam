import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionBlankComponent } from './projection-blank.component';

describe('ProjectionBlankComponent', () => {
  let component: ProjectionBlankComponent;
  let fixture: ComponentFixture<ProjectionBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
