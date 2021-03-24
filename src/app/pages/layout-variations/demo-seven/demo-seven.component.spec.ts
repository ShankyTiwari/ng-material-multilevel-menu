import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSevenComponent } from './demo-seven.component';

describe('DemoSevenComponent', () => {
  let component: DemoSevenComponent;
  let fixture: ComponentFixture<DemoSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoSevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
