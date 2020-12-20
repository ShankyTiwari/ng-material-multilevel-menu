import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSixComponent } from './demo-six.component';
import {MultilevelMenuService} from '../../../../../projects/ng-material-multilevel-menu/src/lib/multilevel-menu.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('DemoSixComponent', () => {
  let component: DemoSixComponent;
  let fixture: ComponentFixture<DemoSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoSixComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
