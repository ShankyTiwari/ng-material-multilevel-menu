import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandCollapseComponent } from './expand-collapse.component';

describe('ExpandCollapseComponent', () => {
  let component: ExpandCollapseComponent;
  let fixture: ComponentFixture<ExpandCollapseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
