import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgenciesComponent } from './show-agencies.component';

describe('ShowAgenciesComponent', () => {
  let component: ShowAgenciesComponent;
  let fixture: ComponentFixture<ShowAgenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAgenciesComponent]
    });
    fixture = TestBed.createComponent(ShowAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
