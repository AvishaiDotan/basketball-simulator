import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPreviewComponent } from './player-preview.component';

describe('PlayerPreviewComponent', () => {
  let component: PlayerPreviewComponent;
  let fixture: ComponentFixture<PlayerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
