import { Component, Input, OnChanges, OnInit, Output, EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Configuration, ListStyle, MultilevelNode, ExpandCollapseStatusEnum } from '../app.model';
import { CONSTANT } from '../constants';
import { MultilevelMenuService } from '../multilevel-menu.service';
import { SlideInOut } from '../animation';
import { CommonUtils } from '../common-utils';

@Component({
    selector: 'ng-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css'],
    animations: [SlideInOut],
})
export class ListItemComponent implements OnChanges, OnInit {
    @Input() node: MultilevelNode;
    @Input() level = 1;
    @Input() submenuLevel = 0;
    @Input() selectedNode: MultilevelNode;
    @Input() nodeConfiguration: Configuration = null;
    @Input() nodeExpandCollapseStatus: ExpandCollapseStatusEnum = null;
    @Input() listTemplate: TemplateRef<ElementRef> = null;

    @Output() selectedItem = new EventEmitter<MultilevelNode>();

    isSelected = false;
    expanded = false;
    firstInitializer = false;

    nodeChildren: MultilevelNode[];
    classes: { [index: string]: boolean };
    selectedListClasses: { [index: string]: boolean };

    constructor(private router: Router, public multilevelMenuService: MultilevelMenuService) {
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }

    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;

        if (!CommonUtils.isNullOrUndefined(this.node.faIcon) && this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }

        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }

    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter((n) => !n.hidden) : [];
        this.node.hasChildren = this.hasItems();

        if (!CommonUtils.isNullOrUndefined(this.selectedNode)) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
    }

    setSelectedClass(isFound: boolean): void {
        if (isFound) {
            if (!this.firstInitializer) {
                this.expanded = true;
            }
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined;
        } else {
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

    getPaddingAtStart(): boolean {
        return this.nodeConfiguration.paddingAtStart;
    }

    getListStyle(): ListStyle {
        return {
            color: this.getColor(),
            backgroundColor: this.getBackgroundColor(),
        };
    }

    getColorStyle(): ListStyle {
        return { color: this.getColor() };
    }

    getBackgroundStyle(): ListStyle {
        return { backgroundColor: this.getBackgroundColor() };
    }

    private getColor(): string {
        return this.isSelected
            ? this.nodeConfiguration.selectedListFontColor !== null
                ? this.nodeConfiguration.selectedListFontColor
                : CONSTANT.DEFAULT_SELECTED_FONT_COLOR
            : this.nodeConfiguration.fontColor !== null
            ? this.nodeConfiguration.fontColor
            : CONSTANT.DEFAULT_LIST_FONT_COLOR;
    }

    private getBackgroundColor(): string {
        return this.nodeConfiguration.listBackgroundColor !== null
            ? this.nodeConfiguration.listBackgroundColor
            : CONSTANT.DEFAULT_LIST_BACKGROUND_COLOR;
    }

    hasItems(): boolean {
        return this.nodeChildren.length > 0;
    }

    isRtlLayout(): boolean {
        return this.nodeConfiguration.rtlLayout;
    }

    setClasses(): void {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            [CONSTANT.SUBMENU_ITEM_CLASS_NAME]: this.hasItems() && this.getPaddingAtStart(),
            [CONSTANT.HAS_SUBMENU_ITEM_CLASS_NAME]: this.hasItems(),
        };
    }

    setExpandCollapseStatus(): void {
        if (CommonUtils.isNullOrUndefined(this.nodeExpandCollapseStatus)) {
            return;
        }

        if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
            this.setExpandStatus(true);
        }
        if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
            this.setExpandStatus(false);
        }
    }

    private setExpandStatus(value: boolean): void {
        this.expanded = value;
        if (!this.nodeConfiguration.customTemplate) {
            return;
        }
        this.node.expanded = value;
    }

    expand(node: MultilevelNode): void {
        if (node.disabled) {
            return;
        }

        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.expanded = !this.expanded;
        this.node.expanded = this.expanded;
        this.firstInitializer = true;

        this.setClasses();

        if (this.nodeConfiguration.interfaceWithRoute && node.link) {
            void this.router.navigate([node.link], node.navigationExtras).then();
            return;
        }

        if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
            return;
        }

        if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }

    selectedListItem(node: MultilevelNode): void {
        this.selectedItem.emit(node);
    }
}
