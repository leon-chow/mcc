import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyPageComponent } from './accuracy-page.component';

describe('AccuracyPageComponent', () => {
  let component: AccuracyPageComponent;
  let fixture: ComponentFixture<AccuracyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccuracyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccuracyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
