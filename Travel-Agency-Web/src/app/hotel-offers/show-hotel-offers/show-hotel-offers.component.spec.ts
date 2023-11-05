import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHotelOffersComponent } from './show-hotel-offers.component';

describe('ShowHotelOffersComponent', () => {
  let component: ShowHotelOffersComponent;
  let fixture: ComponentFixture<ShowHotelOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHotelOffersComponent]
    });
    fixture = TestBed.createComponent(ShowHotelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
