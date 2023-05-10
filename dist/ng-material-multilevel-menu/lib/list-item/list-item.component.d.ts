import { OnChanges, OnInit, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration, ListStyle, MultilevelNode, ExpandCollapseStatusEnum } from '../app.model';
import { MultilevelMenuService } from '../multilevel-menu.service';
import * as i0 from "@angular/core";
export declare class ListItemComponent implements OnChanges, OnInit {
    private router;
    multilevelMenuService: MultilevelMenuService;
    node: MultilevelNode;
    level: number;
    submenuLevel: number;
    selectedNode: MultilevelNode;
    nodeConfiguration: Configuration;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum;
    listTemplate: TemplateRef<ElementRef>;
    selectedItem: EventEmitter<MultilevelNode>;
    isSelected: boolean;
    expanded: boolean;
    firstInitializer: boolean;
    nodeChildren: MultilevelNode[];
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
    hasItems(): boolean;
    isRtlLayout(): boolean;
    setClasses(): void;
    setExpandCollapseStatus(): void;
    expand(node: MultilevelNode): void;
    selectedListItem(node: MultilevelNode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListItemComponent, "ng-list-item", never, { "node": { "alias": "node"; "required": false; }; "level": { "alias": "level"; "required": false; }; "submenuLevel": { "alias": "submenuLevel"; "required": false; }; "selectedNode": { "alias": "selectedNode"; "required": false; }; "nodeConfiguration": { "alias": "nodeConfiguration"; "required": false; }; "nodeExpandCollapseStatus": { "alias": "nodeExpandCollapseStatus"; "required": false; }; "listTemplate": { "alias": "listTemplate"; "required": false; }; }, { "selectedItem": "selectedItem"; }, never, never, false, never>;
}
//# sourceMappingURL=list-item.component.d.ts.map