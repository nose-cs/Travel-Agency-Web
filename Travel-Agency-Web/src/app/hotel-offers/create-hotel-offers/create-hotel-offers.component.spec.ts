import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHotelOffersComponent } from './create-hotel-offers.component';

describe('CreateHotelOffersComponent', () => {
  let component: CreateHotelOffersComponent;
  let fixture: ComponentFixture<CreateHotelOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHotelOffersComponent]
    });
    fixture = TestBed.createComponent(CreateHotelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
