import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFilterComponent } from './flight-filter.component';

describe('FlightFilterComponent', () => {
  let component: FlightFilterComponent;
  let fixture: ComponentFixture<FlightFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFilterComponent]
    });
    fixture = TestBed.createComponent(FlightFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
