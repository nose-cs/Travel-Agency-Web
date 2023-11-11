import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourOffersComponent } from './tour-offers.component';

describe('TourOffersComponent', () => {
  let component: TourOffersComponent;
  let fixture: ComponentFixture<TourOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourOffersComponent]
    });
    fixture = TestBed.createComponent(TourOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
