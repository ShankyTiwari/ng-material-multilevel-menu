import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionThreeComponent } from './version-three.component';

describe('VersionThreeComponent', () => {
  let component: VersionThreeComponent;
  let fixture: ComponentFixture<VersionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
