import { OnInit } from '@angular/core';
import { MultilevelNode } from '../../app.model';
import * as i0 from "@angular/core";
export declare class ListItemContentComponent implements OnInit {
    node: MultilevelNode;
    isRtlLayout: boolean;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<ListItemContentComponent, "ng-list-item-content", never, { "node": { "alias": "node"; "required": false; }; "isRtlLayout": { "alias": "isRtlLayout"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=list-item-content.component.d.ts.map