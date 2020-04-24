import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, ListStyle, MultilevelNodes } from './../app.model';
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
    expand(node: MultilevelNodes): void;
    selectedListItem(node: MultilevelNodes): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ListItemComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ListItemComponent, "ng-list-item", never, { "level": "level"; "submenuLevel": "submenuLevel"; "nodeConfiguration": "nodeConfiguration"; "node": "node"; "selectedNode": "selectedNode"; }, { "selectedItem": "selectedItem"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJsaXN0LWl0ZW0uY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTGlzdFN0eWxlLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIHByaXZhdGUgcm91dGVyO1xyXG4gICAgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2U7XHJcbiAgICBub2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgICBsZXZlbDogbnVtYmVyO1xyXG4gICAgc3VibWVudUxldmVsOiBudW1iZXI7XHJcbiAgICBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICAgIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uO1xyXG4gICAgc2VsZWN0ZWRJdGVtOiBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPjtcclxuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICAgIFtpbmRleDogc3RyaW5nXTogYm9vbGVhbjtcclxuICAgIH07XHJcbiAgICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7XHJcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBib29sZWFuO1xyXG4gICAgfTtcclxuICAgIGV4cGFuZGVkOiBib29sZWFuO1xyXG4gICAgZmlyc3RJbml0aWFsaXplcjogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSk7XHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuO1xyXG4gICAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZTtcclxuICAgIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZztcclxuICAgIGdldFNlbGVjdGVkU3ZnSWNvbigpOiBzdHJpbmc7XHJcbiAgICBnZXRTZWxlY3RlZEljb24oKTogc3RyaW5nO1xyXG4gICAgZ2V0U2VsZWN0ZWRGYUljb24oKTogc3RyaW5nO1xyXG4gICAgZ2V0U2VsZWN0ZWRJbWFnZUljb24oKTogc3RyaW5nO1xyXG4gICAgZ2V0SHJlZlRhcmdldFR5cGUoKTogc3RyaW5nO1xyXG4gICAgaGFzSXRlbXMoKTogYm9vbGVhbjtcclxuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW47XHJcbiAgICBzZXRDbGFzc2VzKCk6IHZvaWQ7XHJcbiAgICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZDtcclxuICAgIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZDtcclxufVxyXG4iXX0=