import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOfferDetailsComponent } from './hotel-offer-details.component';

describe('HotelOfferDetailsComponent', () => {
  let component: HotelOfferDetailsComponent;
  let fixture: ComponentFixture<HotelOfferDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelOfferDetailsComponent]
    });
    fixture = TestBed.createComponent(HotelOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
