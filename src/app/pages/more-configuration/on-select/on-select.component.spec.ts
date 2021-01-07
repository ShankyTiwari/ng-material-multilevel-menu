import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSelectComponent } from './on-select.component';

describe('OnSelectComponent', () => {
  let component: OnSelectComponent;
  let fixture: ComponentFixture<OnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
