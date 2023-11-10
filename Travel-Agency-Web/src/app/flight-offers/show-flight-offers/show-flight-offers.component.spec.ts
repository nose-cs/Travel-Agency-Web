import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlightOffersComponent } from './show-flight-offers.component';

describe('ShowFlightOffersComponent', () => {
  let component: ShowFlightOffersComponent;
  let fixture: ComponentFixture<ShowFlightOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFlightOffersComponent]
    });
    fixture = TestBed.createComponent(ShowFlightOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
