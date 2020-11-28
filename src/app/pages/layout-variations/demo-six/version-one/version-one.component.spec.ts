import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionOneComponent } from './version-one.component';

describe('VersionOneComponent', () => {
  let component: VersionOneComponent;
  let fixture: ComponentFixture<VersionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
