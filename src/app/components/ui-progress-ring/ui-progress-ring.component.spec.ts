import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProgressRingComponent } from './ui-progress-ring.component';

describe('UiProgressRingComponent', () => {
  let component: UiProgressRingComponent;
  let fixture: ComponentFixture<UiProgressRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiProgressRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiProgressRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
