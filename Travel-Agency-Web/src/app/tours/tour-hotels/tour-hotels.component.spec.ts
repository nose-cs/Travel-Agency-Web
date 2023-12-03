import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourHotelsComponent } from './tour-hotels.component';

describe('TourHotelsComponent', () => {
  let component: TourHotelsComponent;
  let fixture: ComponentFixture<TourHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourHotelsComponent]
    });
    fixture = TestBed.createComponent(TourHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
