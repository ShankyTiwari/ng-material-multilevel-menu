(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/router'), require('@angular/animations'), require('@angular/material/divider'), require('@angular/material/list'), require('@angular/material/core'), require('@angular/cdk/bidi'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/common', '@angular/core', '@angular/router', '@angular/animations', '@angular/material/divider', '@angular/material/list', '@angular/material/core', '@angular/cdk/bidi', '@angular/material/icon'], factory) :
    (global = global || self, factory(global['ng-material-multilevel-menu'] = {}, global.ng.common, global.ng.core, global.ng.router, global.ng.animations, global.ng.material.divider, global.ng.material.list, global.ng.material.core, global.ng.cdk.bidi, global.ng.material.icon));
}(this, (function (exports, common, core, router, animations, divider, list, core$1, bidi, icon) { 'use strict';

    var CONSTANT = {
        PADDING_AT_START: true,
        DEFAULT_CLASS_NAME: "amml-container",
        DEFAULT_LIST_CLASS_NAME: "amml-item",
        SELECTED_LIST_CLASS_NAME: "selected-amml-item",
        ACTIVE_ITEM_CLASS_NAME: "active-amml-item",
        DISABLED_ITEM_CLASS_NAME: "disabled-amml-item",
        DEFAULT_SELECTED_FONT_COLOR: "#1976d2",
        DEFAULT_LIST_BACKGROUND_COLOR: "transparent",
        DEFAULT_LIST_FONT_COLOR: "rgba(0,0,0,.87)",
        ERROR_MESSAGE: "Invalid data for material Multilevel List Component"
    };

    var MultilevelMenuService = /** @class */ (function () {
        function MultilevelMenuService() {
        }
        MultilevelMenuService.prototype.generateId = function () {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 20; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        MultilevelMenuService.prototype.addRandomId = function (nodes) {
            var _this = this;
            nodes.forEach(function (node) {
                node.id = _this.generateId();
                if (node.items !== undefined) {
                    _this.addRandomId(node.items);
                }
            });
        };
        MultilevelMenuService.prototype.recursiveCheckId = function (node, nodeId) {
            var _this = this;
            if (node.id === nodeId) {
                return true;
            }
            else {
                if (node.items !== undefined) {
                    return node.items.some(function (nestedNode) {
                        return _this.recursiveCheckId(nestedNode, nodeId);
                    });
                }
            }
        };
        MultilevelMenuService.prototype.recursiveCheckLink = function (nodes, link) {
            for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
                var node = nodes[nodeIndex];
                for (var key in node) {
                    if (node.hasOwnProperty(key)) {
                        if (encodeURI(node.link) === link) {
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
        };
        MultilevelMenuService.prototype.getMatchedObjectByUrl = function (node, link) {
            this.recursiveCheckLink(node, link);
            return this.foundLinkObject;
        };
        // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
        // https://angular.io/api/common/KeyValuePipe#description
        MultilevelMenuService.prototype.kvDummyComparerFn = function () {
            return 0;
        };
        MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
        MultilevelMenuService.ɵprov = core.ɵɵdefineInjectable({ token: MultilevelMenuService, factory: MultilevelMenuService.ɵfac, providedIn: 'root' });
        return MultilevelMenuService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(MultilevelMenuService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], null, null); })();

    function ListItemComponent_mat_list_item_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementContainer(0);
    } }
    function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
        var _r8 = core.ɵɵgetCurrentView();
        core.ɵɵelementStart(0, "mat-list-item", 4);
        core.ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { core.ɵɵrestoreView(_r8); var ctx_r7 = core.ɵɵnextContext(); return ctx_r7.expand(ctx_r7.node); });
        core.ɵɵtemplate(1, ListItemComponent_mat_list_item_0_ng_container_1_Template, 1, 0, "ng-container", 5);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r0 = core.ɵɵnextContext();
        var _r2 = core.ɵɵreference(4);
        core.ɵɵpropertyInterpolate("title", ctx_r0.node.label);
        core.ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngTemplateOutlet", _r2);
    } }
    function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
        var _r12 = core.ɵɵgetCurrentView();
        core.ɵɵelementStart(0, "ng-list-item", 8);
        core.ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { core.ɵɵrestoreView(_r12); var ctx_r11 = core.ɵɵnextContext(2); return ctx_r11.selectedListItem($event); });
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var singleNode_r10 = ctx.$implicit;
        var ctx_r9 = core.ɵɵnextContext(2);
        core.ɵɵproperty("nodeConfiguration", ctx_r9.nodeConfiguration)("node", singleNode_r10.value)("level", ctx_r9.level + 1)("submenuLevel", singleNode_r10.key)("selectedNode", ctx_r9.selectedNode);
    } }
    function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 6);
        core.ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 5, "ng-list-item", 7);
        core.ɵɵpipe(2, "keyvalue");
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r1 = core.ɵɵnextContext();
        core.ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngForOf", core.ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
    } }
    function ListItemComponent_ng_template_3_a_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementContainer(0);
    } }
    function ListItemComponent_ng_template_3_a_0_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "a", 11);
        core.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_0_ng_container_1_Template, 1, 0, "ng-container", 5);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r13 = core.ɵɵnextContext(2);
        var _r4 = core.ɵɵreference(6);
        core.ɵɵproperty("href", ctx_r13.node.link, core.ɵɵsanitizeUrl);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngTemplateOutlet", _r4);
    } }
    function ListItemComponent_ng_template_3_a_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementContainer(0);
    } }
    function ListItemComponent_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "a", 12);
        core.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_ng_container_1_Template, 1, 0, "ng-container", 5);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r14 = core.ɵɵnextContext(2);
        var _r4 = core.ɵɵreference(6);
        core.ɵɵproperty("routerLink", ctx_r14.node.link);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngTemplateOutlet", _r4);
    } }
    function ListItemComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵtemplate(0, ListItemComponent_ng_template_3_a_0_Template, 2, 2, "a", 9);
        core.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_Template, 2, 2, "a", 10);
    } if (rf & 2) {
        var ctx_r3 = core.ɵɵnextContext();
        core.ɵɵproperty("ngIf", ctx_r3.node.externalRedirect);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngIf", !ctx_r3.node.externalRedirect);
    } }
    function ListItemComponent_ng_template_5_span_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "span", 21);
        core.ɵɵelement(1, "i", 22);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r17 = core.ɵɵnextContext(2);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngClass", ctx_r17.getSelectedFaIcon());
    } }
    function ListItemComponent_ng_template_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "mat-icon", 23);
        core.ɵɵtext(1);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r18 = core.ɵɵnextContext(2);
        core.ɵɵadvance(1);
        core.ɵɵtextInterpolate1(" ", ctx_r18.getSelectedIcon(), " ");
    } }
    function ListItemComponent_ng_template_5_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelement(0, "mat-icon", 24);
    } if (rf & 2) {
        var ctx_r19 = core.ɵɵnextContext(2);
        core.ɵɵpropertyInterpolate("svgIcon", ctx_r19.getSelectedSvgIcon());
    } }
    function ListItemComponent_ng_template_5_img_5_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelement(0, "img", 25);
    } if (rf & 2) {
        var ctx_r20 = core.ɵɵnextContext(2);
        core.ɵɵpropertyInterpolate("src", ctx_r20.getSelectedImageIcon(), core.ɵɵsanitizeUrl);
        core.ɵɵpropertyInterpolate("alt", ctx_r20.node.label);
    } }
    function ListItemComponent_ng_template_5_div_8_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "mat-icon");
        core.ɵɵtext(1, " keyboard_arrow_down ");
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r22 = core.ɵɵnextContext(3);
        core.ɵɵproperty("@isExpandedLTR", ctx_r22.expanded ? "yes" : "no");
    } }
    function ListItemComponent_ng_template_5_div_8_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "mat-icon");
        core.ɵɵtext(1, " keyboard_arrow_down ");
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r23 = core.ɵɵnextContext(3);
        core.ɵɵproperty("@isExpandedRTL", ctx_r23.expanded ? "yes" : "no");
    } }
    function ListItemComponent_ng_template_5_div_8_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 26);
        core.ɵɵtemplate(1, ListItemComponent_ng_template_5_div_8_mat_icon_1_Template, 2, 1, "mat-icon", 27);
        core.ɵɵtemplate(2, ListItemComponent_ng_template_5_div_8_mat_icon_2_Template, 2, 1, "mat-icon", 27);
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r21 = core.ɵɵnextContext(2);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngIf", !ctx_r21.isRtlLayout());
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngIf", ctx_r21.isRtlLayout());
    } }
    function ListItemComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 13);
        core.ɵɵelementStart(1, "div", 14);
        core.ɵɵtemplate(2, ListItemComponent_ng_template_5_span_2_Template, 2, 1, "span", 15);
        core.ɵɵtemplate(3, ListItemComponent_ng_template_5_mat_icon_3_Template, 2, 1, "mat-icon", 16);
        core.ɵɵtemplate(4, ListItemComponent_ng_template_5_mat_icon_4_Template, 1, 1, "mat-icon", 17);
        core.ɵɵtemplate(5, ListItemComponent_ng_template_5_img_5_Template, 1, 2, "img", 18);
        core.ɵɵelementEnd();
        core.ɵɵelementStart(6, "span", 19);
        core.ɵɵtext(7);
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
        core.ɵɵtemplate(8, ListItemComponent_ng_template_5_div_8_Template, 3, 2, "div", 20);
    } if (rf & 2) {
        var ctx_r5 = core.ɵɵnextContext();
        core.ɵɵproperty("dir", ctx_r5.isRtlLayout() ? "rtl" : "ltr");
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngSwitch", ctx_r5.getListIcon(ctx_r5.node));
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngSwitchCase", "faicon");
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngSwitchCase", "icon");
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngSwitchCase", "svgicon");
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngSwitchCase", "imageicon");
        core.ɵɵadvance(2);
        core.ɵɵtextInterpolate(ctx_r5.node.label);
        core.ɵɵadvance(1);
        core.ɵɵproperty("ngIf", ctx_r5.hasItems());
    } }
    var ListItemComponent = /** @class */ (function () {
        function ListItemComponent(router, multilevelMenuService) {
            var _a;
            this.router = router;
            this.multilevelMenuService = multilevelMenuService;
            this.level = 1;
            this.submenuLevel = 0;
            this.nodeConfiguration = null;
            this.selectedItem = new core.EventEmitter();
            this.isSelected = false;
            this.expanded = false;
            this.firstInitializer = false;
            this.selectedListClasses = (_a = {},
                _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
                _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
                _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = false,
                _a);
        }
        ListItemComponent.prototype.ngOnChanges = function () {
            this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
            if (this.selectedNode !== undefined && this.selectedNode !== null) {
                this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
            }
        };
        ListItemComponent.prototype.ngOnInit = function () {
            this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
            if (this.node.faIcon !== null &&
                this.node.faIcon !== undefined &&
                this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
                this.node.faIcon = "fas " + this.node.faIcon;
            }
            this.selectedListClasses["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true;
            if (typeof this.node.expanded === 'boolean') {
                this.expanded = this.node.expanded;
            }
            this.setClasses();
        };
        ListItemComponent.prototype.setSelectedClass = function (isFound) {
            var _a;
            if (isFound) {
                if (!this.firstInitializer) {
                    this.expanded = true;
                }
                this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
            }
            else {
                this.isSelected = false;
                if (this.nodeConfiguration.collapseOnSelect) {
                    this.expanded = false;
                }
            }
            this.selectedListClasses = (_a = {},
                _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
                _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = this.isSelected,
                _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = this.selectedNode.id === this.node.id,
                _a[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled,
                _a["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true,
                _a);
            this.setClasses();
        };
        ListItemComponent.prototype.getPaddingAtStart = function () {
            return this.nodeConfiguration.paddingAtStart ? true : false;
        };
        ListItemComponent.prototype.getListStyle = function () {
            var styles = {
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
        };
        ListItemComponent.prototype.getListIcon = function (node) {
            if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
                return "icon";
            }
            else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
                return "faicon";
            }
            else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
                return "imageicon";
            }
            else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
                return "svgicon";
            }
            else {
                return "";
            }
        };
        ListItemComponent.prototype.getSelectedSvgIcon = function () {
            if (this.isSelected && this.node.activeSvgIcon) {
                return this.node.activeSvgIcon;
            }
            return this.node.svgIcon;
        };
        ListItemComponent.prototype.getSelectedIcon = function () {
            if (this.isSelected && this.node.activeIcon) {
                return this.node.activeIcon;
            }
            return this.node.icon;
        };
        ListItemComponent.prototype.getSelectedFaIcon = function () {
            if (this.isSelected && this.node.activeFaIcon) {
                return this.node.activeFaIcon;
            }
            return this.node.faIcon;
        };
        ListItemComponent.prototype.getSelectedImageIcon = function () {
            if (this.isSelected && this.node.activeImageIcon) {
                return this.node.activeImageIcon;
            }
            return this.node.imageIcon;
        };
        ListItemComponent.prototype.hasItems = function () {
            return this.nodeChildren.length > 0 ? true : false;
        };
        ListItemComponent.prototype.isRtlLayout = function () {
            return this.nodeConfiguration.rtlLayout;
        };
        ListItemComponent.prototype.setClasses = function () {
            var _a;
            this.classes = (_a = {},
                _a["level-" + (this.level + 1)] = true,
                _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
                _a);
        };
        ListItemComponent.prototype.expand = function (node) {
            if (node.disabled) {
                return;
            }
            this.expanded = !this.expanded;
            this.firstInitializer = true;
            this.setClasses();
            if (this.nodeConfiguration.interfaceWithRoute !== null
                && this.nodeConfiguration.interfaceWithRoute
                && node.link !== undefined
                && node.link) {
                if (node.externalRedirect !== undefined && node.externalRedirect) {
                    window.location.href = node.link;
                }
                else {
                    this.router.navigate([node.link], node.navigationExtras);
                }
            }
            else if (node.onSelected && typeof node.onSelected === 'function') {
                node.onSelected(node);
                this.selectedListItem(node);
            }
            else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
                this.selectedListItem(node);
            }
        };
        ListItemComponent.prototype.selectedListItem = function (node) {
            this.selectedItem.emit(node);
        };
        ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(core.ɵɵdirectiveInject(router.Router), core.ɵɵdirectiveInject(MultilevelMenuService)); };
        ListItemComponent.ɵcmp = core.ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration" }, outputs: { selectedItem: "selectedItem" }, features: [core.ɵɵNgOnChangesFeature], decls: 7, vars: 2, consts: [["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["linkTemplate", ""], ["linkLabelOutlet", ""], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click"], [4, "ngTemplateOutlet"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"], ["class", "anml-link", 3, "href", 4, "ngIf"], ["class", "anml-link", 3, "routerLink", 4, "ngIf"], [1, "anml-link", 3, "href"], [1, "anml-link", 3, "routerLink"], [1, "anml-data", 3, "dir"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 2, 5, "mat-list-item", 0);
                core.ɵɵelement(1, "mat-divider");
                core.ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
                core.ɵɵtemplate(3, ListItemComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, core.ɵɵtemplateRefExtractor);
                core.ɵɵtemplate(5, ListItemComponent_ng_template_5_Template, 9, 8, "ng-template", null, 3, core.ɵɵtemplateRefExtractor);
            } if (rf & 2) {
                core.ɵɵproperty("ngIf", !ctx.node.hidden);
                core.ɵɵadvance(2);
                core.ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
            } }, directives: [common.NgIf, divider.MatDivider, list.MatListItem, core$1.MatRipple, common.NgClass, common.NgStyle, common.NgTemplateOutlet, bidi.Dir, common.NgForOf, ListItemComponent, router.RouterLinkWithHref, common.NgSwitch, common.NgSwitchCase, icon.MatIcon, list.MatListAvatarCssMatStyler], pipes: [common.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
                    animations.trigger('slideInOut', [
                        animations.state('in', animations.style({ height: '*', opacity: 0 })),
                        animations.transition(':leave', [
                            animations.style({ height: '*', opacity: 0.2 }),
                            animations.group([
                                animations.animate(200, animations.style({ height: 0 })),
                                animations.animate('200ms ease-out', animations.style({ opacity: 0 }))
                            ])
                        ]),
                        animations.transition(':enter', [
                            animations.style({ height: '0', opacity: 0 }),
                            animations.group([
                                animations.animate(200, animations.style({ height: '*' })),
                                animations.animate('400ms ease-out', animations.style({ opacity: 1 }))
                            ])
                        ])
                    ]),
                    animations.trigger('isExpandedLTR', [
                        animations.state('no', animations.style({ transform: 'rotate(-90deg)' })),
                        animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                        animations.transition('no => yes', animations.animate(200)),
                        animations.transition('yes => no', animations.animate(200))
                    ]),
                    animations.trigger('isExpandedRTL', [
                        animations.state('no', animations.style({ transform: 'rotate(90deg)' })),
                        animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                        animations.transition('no => yes', animations.animate(200)),
                        animations.transition('yes => no', animations.animate(200))
                    ])
                ] } });
        return ListItemComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ListItemComponent, [{
            type: core.Component,
            args: [{
                    selector: 'ng-list-item',
                    templateUrl: './list-item.component.html',
                    styleUrls: ['./list-item.component.css'],
                    animations: [
                        animations.trigger('slideInOut', [
                            animations.state('in', animations.style({ height: '*', opacity: 0 })),
                            animations.transition(':leave', [
                                animations.style({ height: '*', opacity: 0.2 }),
                                animations.group([
                                    animations.animate(200, animations.style({ height: 0 })),
                                    animations.animate('200ms ease-out', animations.style({ opacity: 0 }))
                                ])
                            ]),
                            animations.transition(':enter', [
                                animations.style({ height: '0', opacity: 0 }),
                                animations.group([
                                    animations.animate(200, animations.style({ height: '*' })),
                                    animations.animate('400ms ease-out', animations.style({ opacity: 1 }))
                                ])
                            ])
                        ]),
                        animations.trigger('isExpandedLTR', [
                            animations.state('no', animations.style({ transform: 'rotate(-90deg)' })),
                            animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                            animations.transition('no => yes', animations.animate(200)),
                            animations.transition('yes => no', animations.animate(200))
                        ]),
                        animations.trigger('isExpandedRTL', [
                            animations.state('no', animations.style({ transform: 'rotate(90deg)' })),
                            animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                            animations.transition('no => yes', animations.animate(200)),
                            animations.transition('yes => no', animations.animate(200))
                        ])
                    ]
                }]
        }], function () { return [{ type: router.Router }, { type: MultilevelMenuService }]; }, { node: [{
                type: core.Input
            }], level: [{
                type: core.Input
            }], submenuLevel: [{
                type: core.Input
            }], selectedNode: [{
                type: core.Input
            }], nodeConfiguration: [{
                type: core.Input
            }], selectedItem: [{
                type: core.Output
            }] }); })();

    var MaterialsModule = /** @class */ (function () {
        function MaterialsModule() {
        }
        MaterialsModule.ɵmod = core.ɵɵdefineNgModule({ type: MaterialsModule });
        MaterialsModule.ɵinj = core.ɵɵdefineInjector({ factory: function MaterialsModule_Factory(t) { return new (t || MaterialsModule)(); }, imports: [[
                    icon.MatIconModule,
                    list.MatListModule,
                    core$1.MatRippleModule,
                ],
                icon.MatIconModule,
                list.MatListModule,
                core$1.MatRippleModule] });
        return MaterialsModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(MaterialsModule, { imports: [icon.MatIconModule,
            list.MatListModule,
            core$1.MatRippleModule], exports: [icon.MatIconModule,
            list.MatListModule,
            core$1.MatRippleModule] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(MaterialsModule, [{
            type: core.NgModule,
            args: [{
                    imports: [
                        icon.MatIconModule,
                        list.MatListModule,
                        core$1.MatRippleModule,
                    ],
                    declarations: [],
                    exports: [
                        icon.MatIconModule,
                        list.MatListModule,
                        core$1.MatRippleModule,
                    ]
                }]
        }], null, null); })();

    function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template(rf, ctx) { if (rf & 1) {
        var _r4 = core.ɵɵgetCurrentView();
        core.ɵɵelementStart(0, "ng-list-item", 3);
        core.ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { core.ɵɵrestoreView(_r4); var ctx_r3 = core.ɵɵnextContext(2); return ctx_r3.selectedListItem($event); });
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var node_r2 = ctx.$implicit;
        var ctx_r1 = core.ɵɵnextContext(2);
        core.ɵɵproperty("nodeConfiguration", ctx_r1.nodeConfig)("node", node_r2.value)("level", 1)("submenuLevel", node_r2.key)("selectedNode", ctx_r1.currentNode);
    } }
    function NgMaterialMultilevelMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
        core.ɵɵelementStart(0, "div", 1);
        core.ɵɵelementStart(1, "mat-list");
        core.ɵɵtemplate(2, NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template, 1, 5, "ng-list-item", 2);
        core.ɵɵpipe(3, "keyvalue");
        core.ɵɵelementEnd();
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r0 = core.ɵɵnextContext();
        core.ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
        core.ɵɵadvance(2);
        core.ɵɵproperty("ngForOf", core.ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
    } }
    var NgMaterialMultilevelMenuComponent = /** @class */ (function () {
        function NgMaterialMultilevelMenuComponent(router, multilevelMenuService) {
            this.router = router;
            this.multilevelMenuService = multilevelMenuService;
            this.configuration = null;
            this.selectedItem = new core.EventEmitter();
            this.selectedLabel = new core.EventEmitter();
            this.nodeConfig = {
                paddingAtStart: true,
                listBackgroundColor: null,
                fontColor: null,
                selectedListFontColor: null,
                interfaceWithRoute: null,
                collapseOnSelect: null,
                highlightOnSelect: false,
                rtlLayout: false,
            };
            this.isInvalidConfig = true;
        }
        NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = function () {
            this.detectInvalidConfig();
        };
        NgMaterialMultilevelMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
                this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
                this.router.events
                    .subscribe(function (event) {
                    if (event instanceof router.NavigationEnd) {
                        _this.updateNodeByURL(event.url);
                    }
                });
                this.updateNodeByURL(this.router.url);
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.updateNodeByURL = function (url) {
            var foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
            if (foundNode !== undefined &&
                foundNode.link !== undefined &&
                foundNode.link !== null &&
                foundNode.link !== ''
            // && !foundNode.disabled // Prevent route redirection for disabled menu
            ) {
                this.currentNode = foundNode;
                this.selectedListItem(foundNode);
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.checkValidData = function () {
            if (this.items.length === 0) {
                console.warn(CONSTANT.ERROR_MESSAGE);
            }
            else {
                this.items = this.items.filter(function (n) { return !n.hidden; });
                this.multilevelMenuService.addRandomId(this.items);
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.detectInvalidConfig = function () {
            if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
                this.isInvalidConfig = true;
            }
            else {
                this.isInvalidConfig = false;
                var config = this.configuration;
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
                if (config.rtlLayout !== null &&
                    config.rtlLayout !== undefined &&
                    typeof config.rtlLayout === 'boolean') {
                    this.nodeConfig.rtlLayout = config.rtlLayout;
                }
                this.checkValidData();
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.getClassName = function () {
            if (this.isInvalidConfig) {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
            else {
                if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                    return CONSTANT.DEFAULT_CLASS_NAME + " " + this.configuration.classname;
                }
                else {
                    return CONSTANT.DEFAULT_CLASS_NAME;
                }
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.getGlobalStyle = function () {
            if (!this.isInvalidConfig) {
                var styles = {
                    background: null
                };
                if (this.configuration.backgroundColor !== '' &&
                    this.configuration.backgroundColor !== null &&
                    this.configuration.backgroundColor !== undefined) {
                    styles.background = this.configuration.backgroundColor;
                }
                return styles;
            }
        };
        NgMaterialMultilevelMenuComponent.prototype.isRtlLayout = function () {
            return this.nodeConfig.rtlLayout;
        };
        NgMaterialMultilevelMenuComponent.prototype.selectedListItem = function (event) {
            this.currentNode = event;
            if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
                this.selectedItem.emit(event);
            }
            else {
                this.selectedLabel.emit(event);
            }
        };
        NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(core.ɵɵdirectiveInject(router.Router), core.ɵɵdirectiveInject(MultilevelMenuService)); };
        NgMaterialMultilevelMenuComponent.ɵcmp = core.ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel" }, features: [core.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
            } if (rf & 2) {
                core.ɵɵproperty("ngIf", ctx.items.length !== 0);
            } }, directives: [common.NgIf, common.NgClass, common.NgStyle, bidi.Dir, list.MatList, common.NgForOf, ListItemComponent], pipes: [common.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });
        return NgMaterialMultilevelMenuComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgMaterialMultilevelMenuComponent, [{
            type: core.Component,
            args: [{
                    selector: 'ng-material-multilevel-menu',
                    templateUrl: './ng-material-multilevel-menu.component.html',
                    styleUrls: ['./ng-material-multilevel-menu.component.css'],
                }]
        }], function () { return [{ type: router.Router }, { type: MultilevelMenuService }]; }, { items: [{
                type: core.Input
            }], configuration: [{
                type: core.Input
            }], selectedItem: [{
                type: core.Output
            }], selectedLabel: [{
                type: core.Output
            }] }); })();

    var NgMaterialMultilevelMenuModule = /** @class */ (function () {
        function NgMaterialMultilevelMenuModule() {
        }
        NgMaterialMultilevelMenuModule.ɵmod = core.ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
        NgMaterialMultilevelMenuModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
                    common.CommonModule,
                    MaterialsModule,
                    router.RouterModule,
                ]] });
        return NgMaterialMultilevelMenuModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent,
            ListItemComponent], imports: [common.CommonModule,
            MaterialsModule,
            router.RouterModule], exports: [NgMaterialMultilevelMenuComponent] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgMaterialMultilevelMenuModule, [{
            type: core.NgModule,
            args: [{
                    imports: [
                        common.CommonModule,
                        MaterialsModule,
                        router.RouterModule,
                    ],
                    declarations: [
                        NgMaterialMultilevelMenuComponent,
                        ListItemComponent,
                    ],
                    exports: [NgMaterialMultilevelMenuComponent]
                }]
        }], null, null); })();

    exports.NgMaterialMultilevelMenuComponent = NgMaterialMultilevelMenuComponent;
    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-material-multilevel-menu.umd.js.map
