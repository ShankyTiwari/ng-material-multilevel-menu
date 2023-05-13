import { Component, Input } from '@angular/core';
import { MultilevelNode } from '../../app.model';
import { ExpandedLTR, ExpandedRTL } from '../../animation';
import { CommonUtils } from '../../common-utils';
import { CONSTANT } from '../../constants';

@Component({
    selector: 'ng-list-item-content',
    templateUrl: './list-item-content.component.html',
    styleUrls: ['./list-item-content.component.css'],
    animations: [ExpandedLTR, ExpandedRTL],
})
export class ListItemContentComponent {
    @Input() node: MultilevelNode;
    @Input() isRtlLayout: boolean;

    getListIcon(node: MultilevelNode): string {
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.icon)) {
            return `icon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.faIcon)) {
            return `faIcon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.imageIcon)) {
            return `imageIcon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.svgIcon)) {
            return `svgIcon`;
        }
        return ``;
    }

    getHrefTargetType(): string {
        return this.node.hrefTargetType ? this.node.hrefTargetType : CONSTANT.DEFAULT_HREF_TARGET_TYPE;
    }

    getSelectedSvgIcon(): string {
        return this.node.isSelected && this.node.activeSvgIcon ? this.node.activeSvgIcon : this.node.svgIcon;
    }

    getSelectedIcon(): string {
        return this.node.isSelected && this.node.activeIcon ? this.node.activeIcon : this.node.icon;
    }

    getSelectedFaIcon(): string {
        return this.node.isSelected && this.node.activeFaIcon ? this.node.activeFaIcon : this.node.faIcon;
    }

    getSelectedImageIcon(): string {
        return this.node.isSelected && this.node.activeImageIcon ? this.node.activeImageIcon : this.node.imageIcon;
    }

    nodeExpandStatus(): string {
        return this.node.expanded ? CONSTANT.YES : CONSTANT.NO;
    }
}
