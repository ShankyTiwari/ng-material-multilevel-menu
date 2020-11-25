import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisablePaddingComponent } from './disable-padding.component';

describe('DisablePaddingComponent', () => {
  let component: DisablePaddingComponent;
  let fixture: ComponentFixture<DisablePaddingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisablePaddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisablePaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
