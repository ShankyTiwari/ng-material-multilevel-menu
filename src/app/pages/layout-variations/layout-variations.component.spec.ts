import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutVariationsComponent } from './layout-variations.component';

describe('LayoutVariationsComponent', () => {
  let component: LayoutVariationsComponent;
  let fixture: ComponentFixture<LayoutVariationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutVariationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
