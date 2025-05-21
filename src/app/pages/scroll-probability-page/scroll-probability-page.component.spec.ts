import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollProbabilityPageComponent } from './scroll-probability-page.component';

describe('ScrollProbabilityPageComponent', () => {
  let component: ScrollProbabilityPageComponent;
  let fixture: ComponentFixture<ScrollProbabilityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollProbabilityPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollProbabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
