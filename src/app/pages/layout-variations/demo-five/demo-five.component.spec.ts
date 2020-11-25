import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoFiveComponent } from './demo-five.component';

describe('DemoFiveComponent', () => {
  let component: DemoFiveComponent;
  let fixture: ComponentFixture<DemoFiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
