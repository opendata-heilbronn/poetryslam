import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionAssetComponent } from './projection-asset.component';

describe('ProjectionAssetComponent', () => {
  let component: ProjectionAssetComponent;
  let fixture: ComponentFixture<ProjectionAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
