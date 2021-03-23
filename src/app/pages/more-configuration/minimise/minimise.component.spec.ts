import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimiseComponent } from './minimise.component';

describe('MinimiseComponent', () => {
  let component: MinimiseComponent;
  let fixture: ComponentFixture<MinimiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
