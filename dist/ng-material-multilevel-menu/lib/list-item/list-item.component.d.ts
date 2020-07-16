import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, ListStyle, MultilevelNodes, ExpandCollapseStatusEnum } from './../app.model';
import { MultilevelMenuService } from './../multilevel-menu.service';
import * as ɵngcc0 from '@angular/core';
export declare class ListItemComponent implements OnChanges, OnInit {
    private router;
    multilevelMenuService: MultilevelMenuService;
    node: MultilevelNodes;
    level: number;
    submenuLevel: number;
    selectedNode: MultilevelNodes;
    nodeConfiguration: Configuration;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum;
    selectedItem: EventEmitter<MultilevelNodes>;
    isSelected: boolean;
    nodeChildren: MultilevelNodes[];
    classes: {
        [index: string]: boolean;
    };
    selectedListClasses: {
        [index: string]: boolean;
    };
    expanded: boolean;
    firstInitializer: boolean;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    ngOnInit(): void;
    setSelectedClass(isFound: boolean): void;
    getPaddingAtStart(): boolean;
    getListStyle(): ListStyle;
    getListIcon(node: MultilevelNodes): string;
    getSelectedSvgIcon(): string;
    getSelectedIcon(): string;
    getSelectedFaIcon(): string;
    getSelectedImageIcon(): string;
    getHrefTargetType(): string;
    hasItems(): boolean;
    isRtlLayout(): boolean;
    setClasses(): void;
    setExpandCollapseStatus(): void;
    expand(node: MultilevelNodes): void;
    selectedListItem(node: MultilevelNodes): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ListItemComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ListItemComponent, "ng-list-item", never, { "level": "level"; "submenuLevel": "submenuLevel"; "nodeConfiguration": "nodeConfiguration"; "nodeExpandCollapseStatus": "nodeExpandCollapseStatus"; "node": "node"; "selectedNode": "selectedNode"; }, { "selectedItem": "selectedItem"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJsaXN0LWl0ZW0uY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGVzLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIHByaXZhdGUgcm91dGVyO1xyXG4gICAgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2U7XHJcbiAgICBub2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgICBsZXZlbDogbnVtYmVyO1xyXG4gICAgc3VibWVudUxldmVsOiBudW1iZXI7XHJcbiAgICBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICAgIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uO1xyXG4gICAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW07XHJcbiAgICBzZWxlY3RlZEl0ZW06IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+O1xyXG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVzW107XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBib29sZWFuO1xyXG4gICAgfTtcclxuICAgIHNlbGVjdGVkTGlzdENsYXNzZXM6IHtcclxuICAgICAgICBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW47XHJcbiAgICB9O1xyXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgICBmaXJzdEluaXRpYWxpemVyOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlKTtcclxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQ7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZDtcclxuICAgIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW47XHJcbiAgICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlO1xyXG4gICAgZ2V0TGlzdEljb24obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogc3RyaW5nO1xyXG4gICAgZ2V0U2VsZWN0ZWRTdmdJY29uKCk6IHN0cmluZztcclxuICAgIGdldFNlbGVjdGVkSWNvbigpOiBzdHJpbmc7XHJcbiAgICBnZXRTZWxlY3RlZEZhSWNvbigpOiBzdHJpbmc7XHJcbiAgICBnZXRTZWxlY3RlZEltYWdlSWNvbigpOiBzdHJpbmc7XHJcbiAgICBnZXRIcmVmVGFyZ2V0VHlwZSgpOiBzdHJpbmc7XHJcbiAgICBoYXNJdGVtcygpOiBib29sZWFuO1xyXG4gICAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbjtcclxuICAgIHNldENsYXNzZXMoKTogdm9pZDtcclxuICAgIHNldEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQ7XHJcbiAgICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZDtcclxuICAgIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZDtcclxufVxyXG4iXX0=