import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelOffersComponent } from './add-hotel-offers.component';

describe('AddHotelOffersComponent', () => {
  let component: AddHotelOffersComponent;
  let fixture: ComponentFixture<AddHotelOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHotelOffersComponent]
    });
    fixture = TestBed.createComponent(AddHotelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
