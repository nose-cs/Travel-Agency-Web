import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgencyUsersComponent } from './show-agency-users.component';

describe('ShowAgencyUsersComponent', () => {
  let component: ShowAgencyUsersComponent;
  let fixture: ComponentFixture<ShowAgencyUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAgencyUsersComponent]
    });
    fixture = TestBed.createComponent(ShowAgencyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
