import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontEmitComponent } from './dont-emit.component';

describe('DontEmitComponent', () => {
  let component: DontEmitComponent;
  let fixture: ComponentFixture<DontEmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DontEmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DontEmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
