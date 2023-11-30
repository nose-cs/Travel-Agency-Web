import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgencyUserComponent } from './create-agency-user.component';

describe('CreateAgencyUserComponent', () => {
  let component: CreateAgencyUserComponent;
  let fixture: ComponentFixture<CreateAgencyUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAgencyUserComponent]
    });
    fixture = TestBed.createComponent(CreateAgencyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
