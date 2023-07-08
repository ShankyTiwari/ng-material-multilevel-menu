import { OnInit } from '@angular/core';
import { Configuration, MultilevelNode, ListStyle } from '../../app.model';
import * as i0 from "@angular/core";
export declare class ListItemContentComponent implements OnInit {
    node: MultilevelNode;
    isRtlLayout: boolean;
    listContentStyle: ListStyle;
    nodeConfiguration: Configuration;
    constructor();
    ngOnInit(): void;
    getListIcon(node: MultilevelNode): string;
    getHrefTargetType(): string;
    getSelectedSvgIcon(): string;
    getSelectedIcon(): string;
    getSelectedFaIcon(): string;
    getSelectedImageIcon(): string;
    nodeExpandStatus(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListItemContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListItemContentComponent, "ng-list-item-content", never, { "node": { "alias": "node"; "required": false; }; "isRtlLayout": { "alias": "isRtlLayout"; "required": false; }; "listContentStyle": { "alias": "listContentStyle"; "required": false; }; "nodeConfiguration": { "alias": "nodeConfiguration"; "required": false; }; }, {}, never, never, false, never>;
}
