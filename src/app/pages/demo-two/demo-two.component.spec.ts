import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTwoComponent } from './demo-two.component';

describe('DemoTwoComponent', () => {
  let component: DemoTwoComponent;
  let fixture: ComponentFixture<DemoTwoComponent>;

  beforeEach(async(() => {
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
