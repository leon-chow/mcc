import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrindingPageComponent } from './grinding-page.component';

describe('GrindingPageComponent', () => {
  let component: GrindingPageComponent;
  let fixture: ComponentFixture<GrindingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrindingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrindingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
