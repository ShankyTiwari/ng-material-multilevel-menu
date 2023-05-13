import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectByIdComponent } from './select-by-id.component';
import { MultilevelMenuService } from '../../../../../projects/ng-material-multilevel-menu/src/lib/multilevel-menu.service';

describe('SelectByIdComponent', () => {
    let component: SelectByIdComponent;
    let fixture: ComponentFixture<SelectByIdComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectByIdComponent],
            providers: [MultilevelMenuService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectByIdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
