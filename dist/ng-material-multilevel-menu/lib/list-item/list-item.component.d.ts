import { OnChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MultilevelMenuService } from './../multilevel-menu.service';
import { Configuration, MultilevelNodes, ListStyle } from './../app.model';
export declare class ListItemComponent implements OnChanges {
    private router;
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
    expanded: boolean;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    setSelectedClass(isFound: boolean): void;
    getPaddingAtStart(): boolean;
    getListStyle(): ListStyle;
    hasItems(): boolean;
    setClasses(): void;
    expand(node: MultilevelNodes): void;
    selectedListItem(node: MultilevelNodes): void;
}
