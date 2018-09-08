import { NgModule, Injectable, Component, Input, Output, EventEmitter, defineInjectable } from '@angular/core';
import { MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MaterialsModule {
}
MaterialsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatIconModule,
                    MatListModule,
                    MatRippleModule,
                ],
                declarations: [],
                exports: [
                    MatIconModule,
                    MatListModule,
                    MatRippleModule,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MultilevelMenuService {
    /**
     * @return {?}
     */
    generateId() {
        /** @type {?} */
        let text = '';
        /** @type {?} */
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    addRandomId(nodes) {
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
    }
    /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    recursiveCheckId(node, nodeId) {
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some((nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    }
    /**
     * @param {?} nodes
     * @param {?} link
     * @return {?}
     */
    recursiveCheckLink(nodes, link) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            /** @type {?} */
            const node = nodes[nodeIndex];
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    if (node.link === link) {
                        this.foundLinkObject = node;
                    }
                    else {
                        if (node.items !== undefined) {
                            this.recursiveCheckLink(node.items, link);
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} node
     * @param {?} link
     * @return {?}
     */
    getMatchedObjectByUrl(node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    }
}
MultilevelMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ MultilevelMenuService.ngInjectableDef = defineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: `amml-container`,
    DEFAULT_LIST_CLASS_NAME: `amml-item`,
    SELECTED_LIST_CLASS_NAME: `selected-amml-item`,
    DEFAULT_SELECTED_FONT_COLOR: `#1976d2`,
    DEFAULT_LIST_BACKGROUND_COLOR: `#fff`,
    DEFAULT_LIST_FONT_COLOR: `rgba(0,0,0,.87)`,
    ERROR_MESSAGE: `Invalid data for material Multilevel List Component`
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgMaterialMultilevelMenuComponent {
    /**
     * @param {?} router
     * @param {?} multilevelMenuService
     */
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.nodeConfig = {
            paddingAtStart: true,
            listBackgroundColor: null,
            fontColor: null,
            selectedListFontColor: null,
            interfaceWithRoute: null,
            collapseOnSelect: null,
            highlightOnSelect: false
        };
        this.isInvalidConfig = true;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.checkValiddata();
        this.detectInvalidConfig();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.url);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    updateNodeByURL(url) {
        /** @type {?} */
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== '') {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    }
    /**
     * @return {?}
     */
    checkValiddata() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
        }
    }
    /**
     * @return {?}
     */
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            /** @type {?} */
            const config = this.configuration;
            if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean') {
                this.nodeConfig.paddingAtStart = config.paddingAtStart;
            }
            if (config.listBackgroundColor !== '' &&
                config.listBackgroundColor !== null &&
                config.listBackgroundColor !== undefined) {
                this.nodeConfig.listBackgroundColor = config.listBackgroundColor;
            }
            if (config.fontColor !== '' &&
                config.fontColor !== null &&
                config.fontColor !== undefined) {
                this.nodeConfig.fontColor = config.fontColor;
            }
            if (config.selectedListFontColor !== '' &&
                config.selectedListFontColor !== null &&
                config.selectedListFontColor !== undefined) {
                this.nodeConfig.selectedListFontColor = config.selectedListFontColor;
            }
            if (config.interfaceWithRoute !== null &&
                config.interfaceWithRoute !== undefined &&
                typeof config.interfaceWithRoute === 'boolean') {
                this.nodeConfig.interfaceWithRoute = config.interfaceWithRoute;
            }
            if (config.collapseOnSelect !== null &&
                config.collapseOnSelect !== undefined &&
                typeof config.collapseOnSelect === 'boolean') {
                this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
            }
            if (config.highlightOnSelect !== null &&
                config.highlightOnSelect !== undefined &&
                typeof config.highlightOnSelect === 'boolean') {
                this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
            }
        }
    }
    /**
     * @return {?}
     */
    getClassName() {
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    }
    /**
     * @return {?}
     */
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            /** @type {?} */
            const styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectedListItem(event) {
        this.currentNode = event;
        if (event.items === undefined && !event.onSelected) {
            this.selectedItem.emit(event);
        }
    }
}
NgMaterialMultilevelMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-material-multilevel-menu',
                template: `<div [ngClass]="getClassName()" [ngStyle]="getGlobalStyle()" *ngIf='items.length !== 0'>
  <mat-list>
    <ng-list-item 
      *ngFor="let node of items" 
      [nodeConfiguration]='nodeConfig' 
      [node]='node' 
      [selectedNode]='currentNode' 
      (selectedItem)="selectedListItem($event)
    ">
    </ng-list-item>
  </mat-list>
</div>`,
                styles: [`.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.amml-submenu{margin-left:16px}.active{color:#1976d2}`],
            },] },
];
/** @nocollapse */
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    selectedItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ListItemComponent {
    /**
     * @param {?} router
     * @param {?} multilevelMenuService
     */
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
        };
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    }
    /**
     * @param {?} isFound
     * @return {?}
     */
    setSelectedClass(isFound) {
        if (isFound) {
            this.expanded = true;
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
        }
        else {
            this.isSelected = false;
            if (this.nodeConfiguration.collapseOnSelect) {
                this.expanded = false;
            }
        }
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
        };
        this.setClasses();
    }
    /**
     * @return {?}
     */
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    /**
     * @return {?}
     */
    getListStyle() {
        /** @type {?} */
        const styles = {
            background: CONSTANT.DEFAULT_LIST_BACKGROUND_COLOR,
            color: CONSTANT.DEFAULT_LIST_FONT_COLOR
        };
        if (this.nodeConfiguration.listBackgroundColor !== null) {
            styles.background = this.nodeConfiguration.listBackgroundColor;
        }
        if (this.isSelected) {
            this.nodeConfiguration.selectedListFontColor !== null ?
                styles.color = this.nodeConfiguration.selectedListFontColor : styles.color = CONSTANT.DEFAULT_SELECTED_FONT_COLOR;
        }
        else if (this.nodeConfiguration.fontColor !== null) {
            styles.color = this.nodeConfiguration.fontColor;
        }
        return styles;
    }
    /**
     * @return {?}
     */
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    /**
     * @return {?}
     */
    setClasses() {
        this.classes = {
            ['level-' + this.level]: true,
            'amml-submenu': this.hasItems() && this.expanded && this.getPaddingAtStart()
        };
    }
    /**
     * @param {?} node
     * @return {?}
     */
    expand(node) {
        this.expanded = !this.expanded;
        this.setClasses();
        if (node.onSelected) {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined) {
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.link;
            }
            else {
                this.router.navigate([node.link]);
            }
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
}
ListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-list-item',
                template: `<mat-list-item matRipple [ngClass]="selectedListClasses" *ngIf="!node.hidden" (click)="expand(node)" title="{{node.label}}"
  [ngStyle]="getListStyle()">
  <div class="anml-data">
    <span *ngIf="node.faIcon" class="amml-icon amml-icon-fa">
      <i [ngClass]="node.faIcon"></i>
    </span>
    <mat-icon *ngIf="node.icon" class="amml-icon">
      {{node.icon}}
    </mat-icon>
    <span class="label">{{node.label}}</span>
  </div>
  <mat-icon *ngIf='hasItems()' [@isExpanded]="hasItems() && expanded ? 'yes' : 'no'">
    keyboard_arrow_down
  </mat-icon>
</mat-list-item>

<mat-divider></mat-divider>

<div *ngIf="hasItems() && expanded" [@slideInOut] [ngClass]="classes">
  <ng-list-item *ngFor="let singleNode of nodeChildren" 
    [nodeConfiguration]='nodeConfiguration' 
    [node]='singleNode' 
    [level]="level + 1"
    [selectedNode]='selectedNode'
    (selectedItem)="selectedListItem($event)">
  </ng-list-item>
</div>
`,
                styles: [`.amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.label{line-height:48px}.amml-submenu{margin-left:16px}`],
                animations: [
                    trigger('slideInOut', [
                        state('in', style({ height: '*', opacity: 0 })),
                        transition(':leave', [
                            style({ height: '*', opacity: 0.2 }),
                            group([
                                animate(300, style({ height: 0 })),
                                animate('200ms ease-out', style({ opacity: 0 }))
                            ])
                        ]),
                        transition(':enter', [
                            style({ height: '0', opacity: 0 }),
                            group([
                                animate(200, style({ height: '*' })),
                                animate('400ms ease-out', style({ opacity: 1 }))
                            ])
                        ])
                    ]),
                    trigger('isExpanded', [
                        state('no', style({ transform: 'rotate(-90deg)' })),
                        state('yes', style({ transform: 'rotate(0deg)', })),
                        transition('no => yes', animate(300)),
                        transition('yes => no', animate(300))
                    ])
                ]
            },] },
];
/** @nocollapse */
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
ListItemComponent.propDecorators = {
    node: [{ type: Input }],
    level: [{ type: Input }],
    selectedNode: [{ type: Input }],
    nodeConfiguration: [{ type: Input }],
    selectedItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgMaterialMultilevelMenuModule {
}
NgMaterialMultilevelMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MaterialsModule
                ],
                declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
                exports: [NgMaterialMultilevelMenuComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgMaterialMultilevelMenuModule, ListItemComponent as ɵd, MaterialsModule as ɵa, MultilevelMenuService as ɵc, NgMaterialMultilevelMenuComponent as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL21hdGVyaWFscy5tb2R1bGUudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvY29uc3RhbnRzLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0UmlwcGxlTW9kdWxlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRSaXBwbGVNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc01vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xyXG4gIGZvdW5kTGlua09iamVjdDogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZXh0ID0gJyc7XHJcbiAgICBjb25zdCBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgYWRkUmFuZG9tSWQobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdKTogdm9pZCB7XHJcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgbm9kZS5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKG5vZGUuaWQgPT09IG5vZGVJZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNoZWNrSWQobmVzdGVkTm9kZSwgbm9kZUlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0xpbmsobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IG5vZGVzLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW25vZGVJbmRleF07XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBpZiAobm9kZS5saW5rID09PSBsaW5rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm91bmRMaW5rT2JqZWN0ID0gbm9kZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLml0ZW1zLCBsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXRjaGVkT2JqZWN0QnlVcmwobm9kZTogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IE11bHRpbGV2ZWxOb2RlcyB7XHJcbiAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLCBsaW5rKTtcclxuICAgIHJldHVybiB0aGlzLmZvdW5kTGlua09iamVjdDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IENPTlNUQU5UID0ge1xyXG4gICAgUEFERElOR19BVF9TVEFSVDogdHJ1ZSxcclxuICAgIERFRkFVTFRfQ0xBU1NfTkFNRTogYGFtbWwtY29udGFpbmVyYCxcclxuICAgIERFRkFVTFRfTElTVF9DTEFTU19OQU1FOiBgYW1tbC1pdGVtYCxcclxuICAgIFNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRTogYHNlbGVjdGVkLWFtbWwtaXRlbWAsXHJcbiAgICBERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I6IGAjMTk3NmQyYCxcclxuICAgIERFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SOiBgI2ZmZmAsXHJcbiAgICBERUZBVUxUX0xJU1RfRk9OVF9DT0xPUjogYHJnYmEoMCwwLDAsLjg3KWAsXHJcbiAgICBFUlJPUl9NRVNTQUdFOiBgSW52YWxpZCBkYXRhIGZvciBtYXRlcmlhbCBNdWx0aWxldmVsIExpc3QgQ29tcG9uZW50YFxyXG59O1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBCYWNrZ3JvdW5kU3R5bGUgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWUoKVwiIFtuZ1N0eWxlXT1cImdldEdsb2JhbFN0eWxlKClcIiAqbmdJZj0naXRlbXMubGVuZ3RoICE9PSAwJz5cclxuICA8bWF0LWxpc3Q+XHJcbiAgICA8bmctbGlzdC1pdGVtIFxyXG4gICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiBpdGVtc1wiIFxyXG4gICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlnJyBcclxuICAgICAgW25vZGVdPSdub2RlJyBcclxuICAgICAgW3NlbGVjdGVkTm9kZV09J2N1cnJlbnROb2RlJyBcclxuICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcclxuICAgIFwiPlxyXG4gICAgPC9uZy1saXN0LWl0ZW0+XHJcbiAgPC9tYXQtbGlzdD5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtwb3NpdGlvbjpyZWxhdGl2ZX0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0fS5hbW1sLWljb257bGluZS1oZWlnaHQ6NDhweDttYXJnaW4tcmlnaHQ6MTVweH0uYW1tbC1pY29uLWZhe2ZvbnQtc2l6ZToyMHB4fS5hbW1sLXN1Ym1lbnV7bWFyZ2luLWxlZnQ6MTZweH0uYWN0aXZle2NvbG9yOiMxOTc2ZDJ9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaXRlbXM6IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIG5vZGVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcclxuICAgIGxpc3RCYWNrZ3JvdW5kQ29sb3I6IG51bGwsXHJcbiAgICBmb250Q29sb3I6IG51bGwsXHJcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXHJcbiAgICBpbnRlcmZhY2VXaXRoUm91dGU6IG51bGwsXHJcbiAgICBjb2xsYXBzZU9uU2VsZWN0OiBudWxsLFxyXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlXHJcbiAgfTtcclxuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkZGF0YSgpO1xyXG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSAnJyAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwodGhpcy5yb3V0ZXIudXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcclxuICAgIGlmIChcclxuICAgICAgZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gJydcclxuICAgICkge1xyXG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tWYWxpZGRhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKTtcclxuICAgICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcclxuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xyXG4gICAgICBpZiAoY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gJycgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xyXG4gICAgaWYgKGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiYgIWV2ZW50Lm9uU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMsIExpc3RTdHlsZSB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJub2RlLmZhSWNvblwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtaWNvbi1mYVwiPlxyXG4gICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vZGUuaWNvblwiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgIHt7bm9kZS5pY29ufX1cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPG1hdC1pY29uICpuZ0lmPSdoYXNJdGVtcygpJyBbQGlzRXhwYW5kZWRdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gIDwvbWF0LWljb24+XHJcbjwvbWF0LWxpc3QtaXRlbT5cclxuXHJcbjxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxyXG5cclxuPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlblwiIFxyXG4gICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nIFxyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJyBcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3NlbGVjdGVkTm9kZV09J3NlbGVjdGVkTm9kZSdcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydDtoZWlnaHQ6NDhweH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0ubGFiZWx7bGluZS1oZWlnaHQ6NDhweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9YF0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5oaWdobGlnaHRPblNlbGVjdCB8fCB0aGlzLnNlbGVjdGVkTm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IHRoaXMuaXNTZWxlY3RlZCxcclxuICAgIH07XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICB9XHJcbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5wYWRkaW5nQXRTdGFydCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgIGJhY2tncm91bmQ6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SLFxyXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XHJcbiAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgOiBzdHlsZXMuY29sb3IgPSBDT05TVEFOVC5ERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgc2V0Q2xhc3NlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xhc3NlcyA9IHtcclxuICAgICAgWydsZXZlbC0nICsgdGhpcy5sZXZlbF06IHRydWUsXHJcbiAgICAgICdhbW1sLXN1Ym1lbnUnOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5leHBhbmRlZCAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gICAgaWYgKG5vZGUub25TZWxlY3RlZCkge1xyXG4gICAgICBub2RlLm9uU2VsZWN0ZWQobm9kZSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcclxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcclxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChub2RlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxzTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbHMubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdGVyaWFsc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50LCBMaXN0SXRlbUNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudU1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O1lBUUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsZUFBZTtpQkFDaEI7YUFDRjs7Ozs7OztBQ3BCRDs7OztJQVFFLFVBQVU7O1FBQ1IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUNkLE1BQU0sUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBQ2xGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUNELFdBQVcsQ0FBQyxLQUF3QjtRQUNsQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBcUI7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBQ0QsZ0JBQWdCLENBQUMsSUFBcUIsRUFBRSxNQUFjO1FBQ3BELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFN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