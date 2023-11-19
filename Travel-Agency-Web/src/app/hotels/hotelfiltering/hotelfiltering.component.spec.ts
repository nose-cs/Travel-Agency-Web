import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelfilteringComponent } from './hotelfiltering.component';

describe('HotelfilteringComponent', () => {
  let component: HotelfilteringComponent;
  let fixture: ComponentFixture<HotelfilteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelfilteringComponent]
    });
    fixture = TestBed.createComponent(HotelfilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
