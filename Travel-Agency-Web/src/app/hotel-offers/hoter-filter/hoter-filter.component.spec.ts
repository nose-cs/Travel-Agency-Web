import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoterFilterComponent } from './hoter-filter.component';

describe('HoterFilterComponent', () => {
  let component: HoterFilterComponent;
  let fixture: ComponentFixture<HoterFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoterFilterComponent]
    });
    fixture = TestBed.createComponent(HoterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
