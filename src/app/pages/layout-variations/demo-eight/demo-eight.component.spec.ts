import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEightComponent } from './demo-eight.component';

describe('DemoEightComponent', () => {
  let component: DemoEightComponent;
  let fixture: ComponentFixture<DemoEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoEightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
