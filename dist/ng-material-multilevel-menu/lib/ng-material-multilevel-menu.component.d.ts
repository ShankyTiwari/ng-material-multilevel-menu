import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundStyle, Configuration, MultilevelNodes } from './app.model';
import { MultilevelMenuService } from './multilevel-menu.service';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<NgMaterialMultilevelMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgMaterialMultilevelMenuComponent, "ng-material-multilevel-menu", never, { "items": "items"; "configuration": "configuration"; }, { "selectedItem": "selectedItem"; "selectedLabel": "selectedLabel"; }, never, never>;
}
