import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, ListStyle, MultilevelNodes } from './../app.model';
import { MultilevelMenuService } from './../multilevel-menu.service';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<ListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ListItemComponent, "ng-list-item", never, { "node": "node"; "level": "level"; "submenuLevel": "submenuLevel"; "selectedNode": "selectedNode"; "nodeConfiguration": "nodeConfiguration"; }, { "selectedItem": "selectedItem"; }, never, never>;
}
