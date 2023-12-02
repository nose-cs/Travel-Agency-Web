import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHotelsComponent } from './show-hotels.component';

describe('ShowHotelsComponent', () => {
  let component: ShowHotelsComponent;
  let fixture: ComponentFixture<ShowHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHotelsComponent]
    });
    fixture = TestBed.createComponent(ShowHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
