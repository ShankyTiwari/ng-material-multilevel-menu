import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MultilevelMenuService } from './multilevel-menu.service';
import { Configuration, MultilevelNodes, BackgroundStyle } from './app.model';
export declare class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges {
    private router;
    private multilevelMenuService;
    items: MultilevelNodes[];
    configuration: Configuration;
    selectedItem: EventEmitter<MultilevelNodes>;
    currentNode: MultilevelNodes;
    nodeConfig: Configuration;
    isInvalidConfig: boolean;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    ngOnInit(): void;
    updateNodeByURL(url: string): void;
    checkValiddata(): void;
    detectInvalidConfig(): void;
    getClassName(): string;
    getGlobalStyle(): BackgroundStyle;
    selectedListItem(event: MultilevelNodes): void;
}
