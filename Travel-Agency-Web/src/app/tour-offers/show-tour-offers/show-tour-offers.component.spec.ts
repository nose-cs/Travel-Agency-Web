import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTourOffersComponent } from './show-tour-offers.component';

describe('ShowTourOffersComponent', () => {
  let component: ShowTourOffersComponent;
  let fixture: ComponentFixture<ShowTourOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTourOffersComponent]
    });
    fixture = TestBed.createComponent(ShowTourOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
