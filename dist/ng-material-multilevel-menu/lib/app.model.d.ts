import { NavigationExtras } from '@angular/router';
export interface MultilevelNodes {
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
    items?: MultilevelNodes[];
    onSelected?: Function;
    disabled?: boolean;
    expanded?: boolean;
    navigationExtras?: NavigationExtras;
    dontEmit?: boolean;
    hasChilden?: boolean;
    isSelected?: boolean;
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
export declare enum ExpandCollapseStatusEnum {
    expand = "expand",
    collapse = "collapse",
    neutral = "neutral"
}
