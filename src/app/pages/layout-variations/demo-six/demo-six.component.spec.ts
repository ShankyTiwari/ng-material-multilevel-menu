import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSixComponent } from './demo-six.component';

describe('DemoSixComponent', () => {
  let component: DemoSixComponent;
  let fixture: ComponentFixture<DemoSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
