import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFlightComponent } from './create-edit-flight.component';

describe('CreateEditFlightComponent', () => {
  let component: CreateEditFlightComponent;
  let fixture: ComponentFixture<CreateEditFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditFlightComponent]
    });
    fixture = TestBed.createComponent(CreateEditFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
