import { OnChanges, OnInit, OnDestroy, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackgroundStyle, Configuration, MultilevelNode, ExpandCollapseStatusEnum } from './app.model';
import { MultilevelMenuService } from './multilevel-menu.service';
import * as i0 from "@angular/core";
export declare class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges, OnDestroy {
    private router;
    multilevelMenuService: MultilevelMenuService;
    items: MultilevelNode[];
    configuration: Configuration;
    selectedItem: EventEmitter<MultilevelNode>;
    selectedLabel: EventEmitter<MultilevelNode>;
    menuIsReady: EventEmitter<MultilevelNode[]>;
    listTemplate: TemplateRef<ElementRef>;
    expandCollapseStatusSubscription: Subscription;
    selectMenuByIDSubscription: Subscription;
    currentNode: MultilevelNode;
    nodeConfig: Configuration;
    isInvalidConfig: boolean;
    isInvalidData: boolean;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum;
    constructor(router: Router, multilevelMenuService: MultilevelMenuService);
    ngOnChanges(): void;
    ngOnInit(): void;
    updateNodeByURL(url: string): void;
    checkValidData(): void;
    detectInvalidConfig(): void;
    initExpandCollapseStatus(): void;
    initSelectedMenuID(): void;
    getClassName(): string;
    getGlobalStyle(): BackgroundStyle;
    isRtlLayout(): boolean;
    selectedListItem(event: MultilevelNode): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgMaterialMultilevelMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgMaterialMultilevelMenuComponent, "ng-material-multilevel-menu", never, { "items": { "alias": "items"; "required": false; }; "configuration": { "alias": "configuration"; "required": false; }; }, { "selectedItem": "selectedItem"; "selectedLabel": "selectedLabel"; "menuIsReady": "menuIsReady"; }, ["listTemplate"], never, false, never>;
}
//# sourceMappingURL=ng-material-multilevel-menu.component.d.ts.map