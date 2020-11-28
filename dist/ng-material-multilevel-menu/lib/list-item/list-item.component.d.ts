import { OnChanges, OnInit, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, ListStyle, MultilevelNodes, ExpandCollapseStatusEnum } from './../app.model';
import { MultilevelMenuService } from './../multilevel-menu.service';
export declare class ListItemComponent implements OnChanges, OnInit {
    private router;
    multilevelMenuService: MultilevelMenuService;
    node: MultilevelNodes;
    level: number;
    submenuLevel: number;
    selectedNode: MultilevelNodes;
    nodeConfiguration: Configuration;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum;
    listTemplate: TemplateRef<ElementRef>;
    selectedItem: EventEmitter<MultilevelNodes>;
    isSelected: boolean;
    expanded: boolean;
    firstInitializer: boolean;
    nodeChildren: MultilevelNodes[];
    classes: {
        [index: string]: boolean;
    };
    selectedListClasses: {
        [index: string]: boolean;
    };
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
}
