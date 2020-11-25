import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisableRoutingComponent } from './disable-routing.component';

describe('DisableRoutingComponent', () => {
  let component: DisableRoutingComponent;
  let fixture: ComponentFixture<DisableRoutingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
