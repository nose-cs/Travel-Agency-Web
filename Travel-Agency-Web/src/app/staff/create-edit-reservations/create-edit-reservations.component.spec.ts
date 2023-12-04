import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReservationsComponent } from './create-edit-reservations.component';

describe('CreateEditReservationsComponent', () => {
  let component: CreateEditReservationsComponent;
  let fixture: ComponentFixture<CreateEditReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditReservationsComponent]
    });
    fixture = TestBed.createComponent(CreateEditReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
