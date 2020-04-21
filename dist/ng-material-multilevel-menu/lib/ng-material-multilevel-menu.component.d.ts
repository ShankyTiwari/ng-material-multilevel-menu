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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQmFja2dyb3VuZFN0eWxlLCBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBwcml2YXRlIHJvdXRlcjtcbiAgICBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZTtcbiAgICBpdGVtczogTXVsdGlsZXZlbE5vZGVzW107XG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbjtcbiAgICBzZWxlY3RlZEl0ZW06IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+O1xuICAgIHNlbGVjdGVkTGFiZWw6IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+O1xuICAgIGN1cnJlbnROb2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gICAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbjtcbiAgICBpc0ludmFsaWRDb25maWc6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlKTtcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZDtcbiAgICBjaGVja1ZhbGlkRGF0YSgpOiB2b2lkO1xuICAgIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZDtcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuICAgIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZTtcbiAgICBpc1J0bExheW91dCgpOiBib29sZWFuO1xuICAgIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQ7XG59XG4iXX0=