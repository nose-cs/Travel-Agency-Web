import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditOffersComponent } from './create-edit-offers.component';

describe('CreateEditOffersComponent', () => {
  let component: CreateEditOffersComponent;
  let fixture: ComponentFixture<CreateEditOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditOffersComponent]
    });
    fixture = TestBed.createComponent(CreateEditOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
