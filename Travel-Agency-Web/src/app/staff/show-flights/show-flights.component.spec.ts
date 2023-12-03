import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlightsComponent } from './show-flights.component';

describe('ShowFlightsComponent', () => {
  let component: ShowFlightsComponent;
  let fixture: ComponentFixture<ShowFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFlightsComponent]
    });
    fixture = TestBed.createComponent(ShowFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
