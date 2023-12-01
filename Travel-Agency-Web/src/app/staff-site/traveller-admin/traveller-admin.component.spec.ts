import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerAdminComponent } from './traveller-admin.component';

describe('TravellerAdminComponent', () => {
  let component: TravellerAdminComponent;
  let fixture: ComponentFixture<TravellerAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravellerAdminComponent]
    });
    fixture = TestBed.createComponent(TravellerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
