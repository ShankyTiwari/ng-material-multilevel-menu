import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';

describe('NgMaterialMultilevelMenuComponent', () => {
  let component: NgMaterialMultilevelMenuComponent;
  let fixture: ComponentFixture<NgMaterialMultilevelMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMaterialMultilevelMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterialMultilevelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
