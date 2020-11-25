import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreConfigurationComponent } from './more-configuration.component';

describe('MoreConfigurationComponent', () => {
  let component: MoreConfigurationComponent;
  let fixture: ComponentFixture<MoreConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
