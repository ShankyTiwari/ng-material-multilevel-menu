import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoOneComponent } from './demo-one.component';

describe('DemoOneComponent', () => {
  let component: DemoOneComponent;
  let fixture: ComponentFixture<DemoOneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
