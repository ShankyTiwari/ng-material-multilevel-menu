import { CommonModule } from '@angular/common';
import { EventEmitter, Component, Input, Output, NgModule, ContentChild } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

var ExpandCollapseStatusEnum;
(function (ExpandCollapseStatusEnum) {
    ExpandCollapseStatusEnum["expand"] = "expand";
    ExpandCollapseStatusEnum["collapse"] = "collapse";
    ExpandCollapseStatusEnum["neutral"] = "neutral";
})(ExpandCollapseStatusEnum || (ExpandCollapseStatusEnum = {}));

const CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: `amml-container`,
    DEFAULT_LIST_CLASS_NAME: `amml-item`,
    SELECTED_LIST_CLASS_NAME: `selected-amml-item`,
    ACTIVE_ITEM_CLASS_NAME: `active-amml-item`,
    DISABLED_ITEM_CLASS_NAME: `disabled-amml-item`,
    SUBMENU_ITEM_CLASS_NAME: `amml-submenu`,
    HAS_SUBMENU_ITEM_CLASS_NAME: `has-amml-submenu`,
    DEFAULT_SELECTED_FONT_COLOR: `#1976d2`,
    DEFAULT_LIST_BACKGROUND_COLOR: `transparent`,
    DEFAULT_LIST_FONT_COLOR: `rgba(0,0,0,.87)`,
    DEFAULT_HREF_TARGET_TYPE: '_self',
    ERROR_MESSAGE: `Invalid data for material Multilevel List Component`
};

class MultilevelMenuService {
    constructor() {
        this.expandCollapseStatus = new Subject();
        this.expandCollapseStatus$ = this.expandCollapseStatus.asObservable();
        this.selectedMenuID = new Subject();
        this.selectedMenuID$ = this.selectedMenuID.asObservable();
    }
    generateId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    addRandomId(nodes) {
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
    }
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
    findNodeRecursively({ nodes, link, id }) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            const node = nodes[nodeIndex];
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    if (encodeURI(node.link) === link) {
                        this.foundLinkObject = node;
                    }
                    else if (node.id === id) {
                        this.foundLinkObject = node;
                    }
                    else {
                        if (node.items !== undefined) {
                            this.findNodeRecursively({
                                nodes: node.items,
                                link: link ? link : null,
                                id: id ? id : null
                            });
                        }
                    }
                }
            }
        }
    }
    getMatchedObjectByUrl(nodes, link) {
        this.findNodeRecursively({ nodes, link });
        return this.foundLinkObject;
    }
    getMatchedObjectById(nodes, id) {
        this.findNodeRecursively({ nodes, id });
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    kvDummyComparerFn() {
        return 0;
    }
    setMenuExapandCollpaseStatus(status) {
        this.expandCollapseStatus.next(status ? status : ExpandCollapseStatusEnum.neutral);
    }
    selectMenuByID(menuID) {
        this.selectedMenuID.next(menuID);
        return this.foundLinkObject;
    }
}

const SlideInOut = trigger('SlideInOut', [
    state('in', style({ height: '*', opacity: 0 })),
    transition(':leave', [
        style({ height: '*', opacity: 0.2 }),
        group([
            animate(200, style({ height: 0 })),
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
]);
const ExpandedLTR = trigger('ExpandedLTR', [
    state('no', style({ transform: 'rotate(-90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
]);
const ExpandedRTL = trigger('ExpandedRTL', [
    state('no', style({ transform: 'rotate(90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
]);

class ListItemComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.nodeExpandCollapseStatus = null;
        this.listTemplate = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        this.node.hasChilden = this.hasItems();
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
    }
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    setSelectedClass(isFound) {
        if (isFound) {
            if (!this.firstInitializer) {
                this.expanded = true;
            }
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
        }
        else {
            this.isSelected = false;
            if (this.nodeConfiguration.collapseOnSelect) {
                this.node.expanded = false;
                this.expanded = false;
            }
        }
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: this.selectedNode.id === this.node.id,
            [CONSTANT.DISABLED_ITEM_CLASS_NAME]: this.node.disabled,
            [`level-${this.level}-submenulevel-${this.submenuLevel}`]: true,
        };
        this.node.isSelected = this.isSelected;
        this.setClasses();
    }
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    getListStyle() {
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
    getListIcon(node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return `icon`;
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return `faicon`;
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return `imageicon`;
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return `svgicon`;
        }
        else {
            return ``;
        }
    }
    getSelectedSvgIcon() {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    }
    getSelectedIcon() {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    }
    getSelectedFaIcon() {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    }
    getSelectedImageIcon() {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    }
    getHrefTargetType() {
        if (this.node.hrefTargetType) {
            return this.node.hrefTargetType;
        }
        return CONSTANT.DEFAULT_HREF_TARGET_TYPE;
    }
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            [CONSTANT.SUBMENU_ITEM_CLASS_NAME]: this.hasItems() && this.getPaddingAtStart(),
            [CONSTANT.HAS_SUBMENU_ITEM_CLASS_NAME]: this.hasItems()
        };
    }
    setExpandCollapseStatus() {
        if (this.nodeExpandCollapseStatus !== null && this.nodeExpandCollapseStatus !== undefined) {
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
                this.expanded = true;
                if (this.nodeConfiguration.customTemplate) {
                    this.node.expanded = true;
                }
            }
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
                this.expanded = false;
                if (this.nodeConfiguration.customTemplate) {
                    this.node.expanded = false;
                }
            }
        }
    }
    expand(node) {
        if (node.disabled) {
            return;
        }
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.expanded = !this.expanded;
        this.node.expanded = this.expanded;
        this.firstInitializer = true;
        this.setClasses();
        if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined
            && node.link) {
            this.router.navigate([node.link], node.navigationExtras);
        }
        else if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
}
ListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-list-item',
                template: "<div class=\"amml-menu-container\">\n  <!-- \n    Base Template rendering condition starts\n  -->\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\n    [ngClass]=\"selectedListClasses\"\n    [ngStyle]=\"getListStyle()\"\n    (click)=\"expand(node)\"\n  >\n    <ng-container [ngTemplateOutlet]=\"listTemplate\" [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\"></ng-container>\n  </div>\n  <!-- \n    Base Template rendering condition ends\n  -->\n\n  <!-- \n    Recursive Template calls begins\n  -->\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfiguration' \n      [node]=\"singleNode.value\" \n      [level]=\"level + 1\"\n      [submenuLevel]=\"singleNode.key\"\n      [selectedNode]='selectedNode' \n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate]=\"listTemplate\"\n    >\n    </ng-list-item>\n  </div>\n</div>\n<!-- \n  Recursive Template calls ends\n-->\n\n<!-- \n  Base Template starts from here \n-->\n<ng-template #baseTemplate>\n  <mat-list-item matRipple \n    *ngIf=\"!node.hidden\"\n    title=\"{{node.label}}\"\n    [matRippleDisabled]=\"node.disabled\" \n    [ngClass]=\"selectedListClasses\"\n    [ngStyle]=\"getListStyle()\"\n    (click)=\"expand(node)\">\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n  </mat-list-item>\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n</ng-template>\n\n<ng-template #linkTemplate>\n  <!-- \n    Improvements:\n    These anchor tags can be removed & we can create a directive.\n    This directive will create a wrapper of an anchor tag with proper attributes on template `linkLabelOutlet`.\n  -->\n  <a class=\"anml-link\" *ngIf=\"node.externalRedirect && node.link\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\n  </a>\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect && node.link\" [routerLink]=\"node.link\">\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\n  </a>\n  <a class=\"anml-link\" *ngIf=\"!node.link\">\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #linkLabelOutlet>\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\n      </span>\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n        {{getSelectedIcon()}}\n      </mat-icon>\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\n      </mat-icon>\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\n        alt=\"{{node.label}}\" />\n    </div>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@ExpandedLTR]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()' [@ExpandedRTL]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>",
                animations: [SlideInOut, ExpandedLTR, ExpandedRTL],
                styles: [".amml-item{cursor:pointer;position:relative}.anml-link{color:inherit;text-decoration:none;text-transform:capitalize}.anml-data,.anml-link{display:flex;justify-content:flex-start;width:100%}.anml-data{height:48px}.disabled-amml-item{opacity:.5;pointer-events:none;text-decoration:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{font-weight:400;line-height:48px}.amml-svg-icon{height:22px;margin-top:-12px;width:22px}.amml-icon-arrow-container{align-items:center;direction:ltr;display:flex}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
            },] }
];
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
ListItemComponent.propDecorators = {
    node: [{ type: Input }],
    level: [{ type: Input }],
    submenuLevel: [{ type: Input }],
    selectedNode: [{ type: Input }],
    nodeConfiguration: [{ type: Input }],
    nodeExpandCollapseStatus: [{ type: Input }],
    listTemplate: [{ type: Input }],
    selectedItem: [{ type: Output }]
};

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
            },] }
];

class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
        this.menuIsReady = new EventEmitter();
        this.expandCollapseStatusSubscription = null;
        this.selectMenuByIDSubscription = null;
        this.currentNode = null;
        this.nodeConfig = {
            paddingAtStart: true,
            listBackgroundColor: null,
            fontColor: null,
            selectedListFontColor: null,
            interfaceWithRoute: null,
            collapseOnSelect: null,
            highlightOnSelect: false,
            useDividers: true,
            rtlLayout: false,
            customTemplate: false,
        };
        this.isInvalidConfig = true;
        this.isInvalidData = true;
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
        this.initExpandCollapseStatus();
        this.initSelectedMenuID();
        if (!this.isInvalidData) {
            this.menuIsReady.emit(this.items);
        }
    }
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.urlAfterRedirects);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    }
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            if (foundNode.dontEmit !== undefined && foundNode.dontEmit !== null && !foundNode.dontEmit) {
                this.selectedListItem(foundNode);
            }
        }
    }
    checkValidData() {
        if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
            this.isInvalidData = false;
        }
    }
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
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
            if (config.useDividers !== null &&
                config.useDividers !== undefined &&
                typeof config.useDividers === 'boolean') {
                this.nodeConfig.useDividers = config.useDividers;
            }
            if (config.rtlLayout !== null &&
                config.rtlLayout !== undefined &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
            if (config.customTemplate !== null &&
                config.customTemplate !== undefined &&
                typeof config.customTemplate === 'boolean') {
                this.nodeConfig.customTemplate = config.customTemplate;
            }
        }
        this.checkValidData();
    }
    initExpandCollapseStatus() {
        this.expandCollapseStatusSubscription = this.multilevelMenuService.expandCollapseStatus$
            .subscribe((expandCollapseStatus) => {
            this.nodeExpandCollapseStatus = expandCollapseStatus ? expandCollapseStatus : ExpandCollapseStatusEnum.neutral;
        }, () => {
            this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        });
    }
    initSelectedMenuID() {
        this.selectMenuByIDSubscription = this.multilevelMenuService.selectedMenuID$.subscribe((selectedMenuID) => {
            if (selectedMenuID) {
                const foundNode = this.multilevelMenuService.getMatchedObjectById(this.items, selectedMenuID);
                if (foundNode !== undefined) {
                    this.currentNode = foundNode;
                    this.selectedListItem(foundNode);
                }
            }
        });
    }
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
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
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
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    selectedListItem(event) {
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.currentNode = event;
        if (event.dontEmit !== undefined && event.dontEmit !== null && event.dontEmit) {
            return;
        }
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
    ngOnDestroy() {
        this.expandCollapseStatusSubscription.unsubscribe();
        this.selectMenuByIDSubscription.unsubscribe();
    }
}
NgMaterialMultilevelMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-material-multilevel-menu',
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n",
                styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{display:flex;justify-content:space-between;line-height:48px;position:relative}.anml-data{display:flex;justify-content:flex-start;text-transform:capitalize;width:100%}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            },] }
];
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    selectedItem: [{ type: Output }],
    selectedLabel: [{ type: Output }],
    menuIsReady: [{ type: Output }],
    listTemplate: [{ type: ContentChild, args: ['listTemplate', { static: true },] }]
};

class NgMaterialMultilevelMenuModule {
}
NgMaterialMultilevelMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MaterialsModule,
                    RouterModule,
                ],
                declarations: [
                    NgMaterialMultilevelMenuComponent,
                    ListItemComponent,
                ],
                exports: [NgMaterialMultilevelMenuComponent]
            },] }
];

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandCollapseStatusEnum, ExpandedLTR, ExpandedRTL, MultilevelMenuService, NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, SlideInOut, MaterialsModule as ɵa, ListItemComponent as ɵb };
//# sourceMappingURL=ng-material-multilevel-menu.js.map
