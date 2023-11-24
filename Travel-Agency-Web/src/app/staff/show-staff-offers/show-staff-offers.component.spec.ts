import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStaffHotelOffersComponent } from './show-staff-offers.component';

describe('ShowStaffHotelOffersComponent', () => {
  let component: ShowStaffHotelOffersComponent;
  let fixture: ComponentFixture<ShowStaffHotelOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStaffHotelOffersComponent]
    });
    fixture = TestBed.createComponent(ShowStaffHotelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
