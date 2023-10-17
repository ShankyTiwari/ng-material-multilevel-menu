import { NavigationExtras } from '@angular/router';

export interface MultilevelNode {
  id?: string;
  label: string;
  faIcon?: string;
  icon?: string;
  imageIcon?: string;
  svgIcon?: string;
  activeFaIcon?: string;
  activeIcon?: string;
  activeImageIcon?: string;
  activeSvgIcon?: string;
  hidden?: boolean;
  link?: string;
  externalRedirect?: boolean;
  hrefTargetType?: string;
  data?: any;
  items?: MultilevelNode[];
  onSelected?: Function;
  disabled?: boolean;
  expanded?: boolean;
  navigationExtras?: NavigationExtras;
  dontEmit?: boolean;
  hasChildren?: boolean;
  isSelected?: boolean;
  dataTest?: string;
}

export interface Configuration {
    classname?: string;
    paddingAtStart?: boolean;
    backgroundColor?: string;
    listBackgroundColor?: string;
    fontColor?: string;
    selectedListFontColor?: string;
    interfaceWithRoute?: boolean;
    collapseOnSelect?: boolean;
    highlightOnSelect?: boolean;
    useDividers?: boolean;
    rtlLayout?: boolean;
    customTemplate?: boolean;
}

export interface BackgroundStyle {
    background: string;
}

export interface ListStyle {
    background: string;
    color: string;
}

export enum ExpandCollapseStatusEnum {
    expand = 'expand',
    collapse = 'collapse',
    neutral = 'neutral',
}
