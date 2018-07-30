import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFourComponent } from './demo-four.component';

describe('DemoFourComponent', () => {
  let component: DemoFourComponent;
  let fixture: ComponentFixture<DemoFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
