import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemContentComponent } from './list-item-content.component';

describe('ListItemContentComponent', () => {
  let component: ListItemContentComponent;
  let fixture: ComponentFixture<ListItemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
