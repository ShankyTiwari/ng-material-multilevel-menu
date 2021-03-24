import {Component, Input, OnInit} from '@angular/core';
import {MultilevelNode} from '../../app.model';
import {FadeInOutListItemElement, RotateListItemIcon, rtlListItemIconState} from '../../animation';
import {CommonUtils} from '../../common-utils';
import {CONSTANT} from '../../constants';

@Component({
  selector: 'ng-list-item-content',
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.css'],
  animations: [RotateListItemIcon, FadeInOutListItemElement]
})
export class ListItemContentComponent implements OnInit {
  @Input() node: MultilevelNode;
  @Input() isRtlLayout: boolean;
  @Input() isMinimised: boolean;

  layoutDirection = CONSTANT.LTR;

  constructor() {
    // NOOP
  }

  ngOnInit(): void {
    if (this.isRtlLayout) {
      this.layoutDirection = CONSTANT.RTL;
    }
  }

  getListIcon(node: MultilevelNode): string {
    if (!CommonUtils.isNullOrUndefinedOrEmpty(node.icon)) {
      return `icon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.faIcon)) {
      return `faIcon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.imageIcon)) {
      return `imageIcon`;
    } else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.svgIcon)) {
      return `svgIcon`;
    } else {
      return ``;
    }
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

  animationTrigger() {
    return this.isRtlLayout ? {value: this.nodeExpandStatus(), rtlListItemIconState} :
      {value: this.nodeExpandStatus()};
  }

  private nodeExpandStatus(): string {
    return this.node.expanded ? CONSTANT.YES : CONSTANT.NO;
  }

}
