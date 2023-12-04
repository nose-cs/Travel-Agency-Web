import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStaffReservationsComponent } from './show-staff-reservations.component';

describe('ShowStaffReservationsComponent', () => {
  let component: ShowStaffReservationsComponent;
  let fixture: ComponentFixture<ShowStaffReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStaffReservationsComponent]
    });
    fixture = TestBed.createComponent(ShowStaffReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
