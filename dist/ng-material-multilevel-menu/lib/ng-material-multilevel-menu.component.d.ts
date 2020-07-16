import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundStyle, Configuration, MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';
import { MultilevelMenuService } from './multilevel-menu.service';
import * as ɵngcc0 from '@angular/core';
export declare class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges {
    private router;
    multilevelMenuService: MultilevelMenuService;
    items: MultilevelNodes[];
    configuration: Configuration;
    expandCollapseStatus: ExpandCollapseStatusEnum;
    selectedItem: EventEmitter<MultilevelNodes>;
    selectedLabel: EventEmitter<MultilevelNodes>;
    currentNode: MultilevelNodes;
    nodeConfig: Configuration;
    isInvalidConfig: boolean;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    ngOnInit(): void;
    updateNodeByURL(url: string): void;
    checkValidData(): void;
    detectInvalidConfig(): void;
    detectExpandCollapseStatus(): void;
    getClassName(): string;
    getGlobalStyle(): BackgroundStyle;
    isRtlLayout(): boolean;
    selectedListItem(event: MultilevelNodes): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgMaterialMultilevelMenuComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgMaterialMultilevelMenuComponent, "ng-material-multilevel-menu", never, { "configuration": "configuration"; "expandCollapseStatus": "expandCollapseStatus"; "items": "items"; }, { "selectedItem": "selectedItem"; "selectedLabel": "selectedLabel"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBwcml2YXRlIHJvdXRlcjtcclxuICAgIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlO1xyXG4gICAgaXRlbXM6IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbjtcclxuICAgIGV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW07XHJcbiAgICBzZWxlY3RlZEl0ZW06IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+O1xyXG4gICAgc2VsZWN0ZWRMYWJlbDogRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz47XHJcbiAgICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gICAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbjtcclxuICAgIGlzSW52YWxpZENvbmZpZzogYm9vbGVhbjtcclxuICAgIG5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1czogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtO1xyXG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlKTtcclxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQ7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZDtcclxuICAgIGNoZWNrVmFsaWREYXRhKCk6IHZvaWQ7XHJcbiAgICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQ7XHJcbiAgICBkZXRlY3RFeHBhbmRDb2xsYXBzZVN0YXR1cygpOiB2b2lkO1xyXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcclxuICAgIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZTtcclxuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW47XHJcbiAgICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkO1xyXG59XHJcbiJdfQ==