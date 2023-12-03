import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTourComponent } from './create-edit-tour.component';

describe('CreateEditTourComponent', () => {
  let component: CreateEditTourComponent;
  let fixture: ComponentFixture<CreateEditTourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditTourComponent]
    });
    fixture = TestBed.createComponent(CreateEditTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
