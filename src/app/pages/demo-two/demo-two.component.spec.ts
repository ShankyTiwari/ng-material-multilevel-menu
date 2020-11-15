import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoTwoComponent } from './demo-two.component';

describe('DemoTwoComponent', () => {
  let component: DemoTwoComponent;
  let fixture: ComponentFixture<DemoTwoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
