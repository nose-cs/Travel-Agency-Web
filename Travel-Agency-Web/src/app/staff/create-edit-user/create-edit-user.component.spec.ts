import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserComponent } from './create-edit-user.component';

describe('CreateAgencyUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditUserComponent]
    });
    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
