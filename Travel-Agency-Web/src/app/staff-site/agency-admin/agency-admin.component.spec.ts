import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminComponent } from './agency-admin.component';

describe('AgencyAdminComponent', () => {
  let component: AgencyAdminComponent;
  let fixture: ComponentFixture<AgencyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyAdminComponent]
    });
    fixture = TestBed.createComponent(AgencyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
