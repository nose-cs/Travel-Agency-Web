import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFilterComponent } from './offer-filter.component';

describe('OfferFilterComponent', () => {
  let component: OfferFilterComponent;
  let fixture: ComponentFixture<OfferFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferFilterComponent]
    });
    fixture = TestBed.createComponent(OfferFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
