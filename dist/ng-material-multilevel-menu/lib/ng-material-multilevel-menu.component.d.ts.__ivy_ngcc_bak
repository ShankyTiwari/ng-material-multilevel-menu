import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundStyle, Configuration, MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';
import { MultilevelMenuService } from './multilevel-menu.service';
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
}
