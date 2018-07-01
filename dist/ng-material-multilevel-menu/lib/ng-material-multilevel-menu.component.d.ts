import { OnInit, EventEmitter } from '@angular/core';
import { MultilevelMenuService } from './multilevel-menu.service';
import { Configuration, MultilevelNodes, BackgroundStyle } from './app.model';
export declare class NgMaterialMultilevelMenuComponent implements OnInit {
    private multilevelMenuService;
    items: MultilevelNodes[];
    configuration: Configuration;
    selectedItem: EventEmitter<MultilevelNodes>;
    currentNode: MultilevelNodes;
    nodeConfig: Configuration;
    isInvalidConfig: boolean;
    isLastItemCliked: boolean;
    constructor(multilevelMenuService: MultilevelMenuService);
    ngOnInit(): void;
    checkValiddata(): void;
    detectInvalidConfig(): void;
    getClassName(): string;
    getGlobalStyle(): BackgroundStyle;
    selectedListItem(event: MultilevelNodes): void;
}
