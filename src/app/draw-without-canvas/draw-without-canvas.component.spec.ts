import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawWithoutCanvasComponent } from './draw-without-canvas.component';

describe('DrawWithoutCanvasComponent', () => {
  let component: DrawWithoutCanvasComponent;
  let fixture: ComponentFixture<DrawWithoutCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawWithoutCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawWithoutCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
