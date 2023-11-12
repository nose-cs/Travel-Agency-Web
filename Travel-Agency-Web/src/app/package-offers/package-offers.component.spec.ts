import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOffersComponent } from './package-offers.component';

describe('PackageOffersComponent', () => {
  let component: PackageOffersComponent;
  let fixture: ComponentFixture<PackageOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageOffersComponent]
    });
    fixture = TestBed.createComponent(PackageOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
