import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorHarmonyComponent } from './color-harmony.component';

describe('ColorHarmonyComponent', () => {
  let component: ColorHarmonyComponent;
  let fixture: ComponentFixture<ColorHarmonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorHarmonyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorHarmonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
