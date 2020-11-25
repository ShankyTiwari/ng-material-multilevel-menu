import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoThreeComponent } from './demo-three.component';

describe('DemoThreeComponent', () => {
  let component: DemoThreeComponent;
  let fixture: ComponentFixture<DemoThreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
