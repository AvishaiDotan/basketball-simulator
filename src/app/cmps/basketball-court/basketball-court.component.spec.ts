import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballCourtComponent } from './basketball-court.component';

describe('BasketballCourtComponent', () => {
  let component: BasketballCourtComponent;
  let fixture: ComponentFixture<BasketballCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballCourtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketballCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
