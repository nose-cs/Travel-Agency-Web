import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAgencyComponent } from './create-edit-agency.component';

describe('CreateEditAgencyComponent', () => {
  let component: CreateEditAgencyComponent;
  let fixture: ComponentFixture<CreateEditAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditAgencyComponent]
    });
    fixture = TestBed.createComponent(CreateEditAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
