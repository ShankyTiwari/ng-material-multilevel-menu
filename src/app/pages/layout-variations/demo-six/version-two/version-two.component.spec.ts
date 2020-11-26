import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionTwoComponent } from './version-two.component';

describe('VersionTwoComponent', () => {
  let component: VersionTwoComponent;
  let fixture: ComponentFixture<VersionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
