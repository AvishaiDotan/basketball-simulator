import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersIndexComponent } from './players-index.component';

describe('PlayersIndexComponent', () => {
  let component: PlayersIndexComponent;
  let fixture: ComponentFixture<PlayersIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
