import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourFilteringComponent } from './tour-filtering.component';

describe('TourFilteringComponent', () => {
  let component: TourFilteringComponent;
  let fixture: ComponentFixture<TourFilteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourFilteringComponent]
    });
    fixture = TestBed.createComponent(TourFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
