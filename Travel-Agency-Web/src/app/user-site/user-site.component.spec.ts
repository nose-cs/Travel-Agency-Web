import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSiteComponent } from './user-site.component';

describe('UserSiteComponent', () => {
  let component: UserSiteComponent;
  let fixture: ComponentFixture<UserSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSiteComponent]
    });
    fixture = TestBed.createComponent(UserSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
