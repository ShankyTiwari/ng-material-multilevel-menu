import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundStyle, Configuration, MultilevelNodes } from './app.model';
import { MultilevelMenuService } from './multilevel-menu.service';
import * as ɵngcc0 from '@angular/core';
export declare class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges {
    private router;
    multilevelMenuService: MultilevelMenuService;
    items: MultilevelNodes[];
    configuration: Configuration;
    selectedItem: EventEmitter<MultilevelNodes>;
    selectedLabel: EventEmitter<MultilevelNodes>;
    currentNode: MultilevelNodes;
    nodeConfig: Configuration;
    isInvalidConfig: boolean;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    ngOnInit(): void;
    updateNodeByURL(url: string): void;
    checkValidData(): void;
    detectInvalidConfig(): void;
    getClassName(): string;
    getGlobalStyle(): BackgroundStyle;
    isRtlLayout(): boolean;
    selectedListItem(event: MultilevelNodes): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgMaterialMultilevelMenuComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgMaterialMultilevelMenuComponent, "ng-material-multilevel-menu", never, { "configuration": "configuration"; "items": "items"; }, { "selectedItem": "selectedItem"; "selectedLabel": "selectedLabel"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gICAgcHJpdmF0ZSByb3V0ZXI7XHJcbiAgICBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZTtcclxuICAgIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb247XHJcbiAgICBzZWxlY3RlZEl0ZW06IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+O1xyXG4gICAgc2VsZWN0ZWRMYWJlbDogRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz47XHJcbiAgICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gICAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbjtcclxuICAgIGlzSW52YWxpZENvbmZpZzogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSk7XHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjaGVja1ZhbGlkRGF0YSgpOiB2b2lkO1xyXG4gICAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkO1xyXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcclxuICAgIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZTtcclxuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW47XHJcbiAgICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkO1xyXG59XHJcbiJdfQ==