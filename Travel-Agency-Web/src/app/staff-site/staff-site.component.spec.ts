import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSiteComponent } from './staff-site.component';

describe('StaffSiteComponent', () => {
  let component: StaffSiteComponent;
  let fixture: ComponentFixture<StaffSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffSiteComponent]
    });
    fixture = TestBed.createComponent(StaffSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
