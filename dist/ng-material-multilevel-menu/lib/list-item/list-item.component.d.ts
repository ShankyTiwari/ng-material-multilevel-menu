import { OnChanges, EventEmitter } from '@angular/core';
import { MultilevelMenuService } from './../multilevel-menu.service';
import { Configuration, MultilevelNodes, ListStyle } from './../app.model';
export declare class ListItemComponent implements OnChanges {
    private multilevelMenuService;
    node: MultilevelNodes;
    level: number;
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
    constructor(multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    getPaddingAtStart(): boolean;
    getListStyle(): ListStyle;
    hasItems(): boolean;
    setClasses(): void;
    expand(node: MultilevelNodes): void;
    selectedListItem(node: MultilevelNodes): void;
}
