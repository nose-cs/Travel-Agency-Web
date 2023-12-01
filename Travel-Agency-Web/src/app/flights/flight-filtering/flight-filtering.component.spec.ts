import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFilteringComponent } from './flight-filtering.component';

describe('FlightFilteringComponent', () => {
  let component: FlightFilteringComponent;
  let fixture: ComponentFixture<FlightFilteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightFilteringComponent]
    });
    fixture = TestBed.createComponent(FlightFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
