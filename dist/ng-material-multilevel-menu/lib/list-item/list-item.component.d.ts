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
    hasItems(): boolean;
    isRtlLayout(): boolean;
    setClasses(): void;
    expand(node: MultilevelNodes): void;
    selectedListItem(node: MultilevelNodes): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ListItemComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ListItemComponent, "ng-list-item", never, { "level": "level"; "submenuLevel": "submenuLevel"; "nodeConfiguration": "nodeConfiguration"; "node": "node"; "selectedNode": "selectedNode"; }, { "selectedItem": "selectedItem"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJsaXN0LWl0ZW0uY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTGlzdFN0eWxlLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLy4uL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICAgIHByaXZhdGUgcm91dGVyO1xuICAgIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlO1xuICAgIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcbiAgICBsZXZlbDogbnVtYmVyO1xuICAgIHN1Ym1lbnVMZXZlbDogbnVtYmVyO1xuICAgIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzO1xuICAgIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uO1xuICAgIHNlbGVjdGVkSXRlbTogRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz47XG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xuICAgIGNsYXNzZXM6IHtcbiAgICAgICAgW2luZGV4OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gICAgc2VsZWN0ZWRMaXN0Q2xhc3Nlczoge1xuICAgICAgICBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW47XG4gICAgfTtcbiAgICBleHBhbmRlZDogYm9vbGVhbjtcbiAgICBmaXJzdEluaXRpYWxpemVyOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyLCBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSk7XG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZDtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQ7XG4gICAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbjtcbiAgICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlO1xuICAgIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZztcbiAgICBnZXRTZWxlY3RlZFN2Z0ljb24oKTogc3RyaW5nO1xuICAgIGdldFNlbGVjdGVkSWNvbigpOiBzdHJpbmc7XG4gICAgZ2V0U2VsZWN0ZWRGYUljb24oKTogc3RyaW5nO1xuICAgIGdldFNlbGVjdGVkSW1hZ2VJY29uKCk6IHN0cmluZztcbiAgICBoYXNJdGVtcygpOiBib29sZWFuO1xuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW47XG4gICAgc2V0Q2xhc3NlcygpOiB2b2lkO1xuICAgIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkO1xuICAgIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZDtcbn1cbiJdfQ==