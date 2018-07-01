export interface MultilevelNodes {
    id: string;
    label: string;
    faIcon?: string;
    icon?: string;
    hidden?: boolean;
    link?: string;
    expanded?: boolean;
    data: any;
    items?: MultilevelNodes[];
}
export interface Configuration {
    classname?: string;
    paddingAtStart?: boolean;
    backgroundColor?: string;
    listBackgroundColor?: string;
    fontColor?: string;
    selectedListFontColor?: string;
}
export interface BackgroundStyle {
    background: string;
}
export interface ListStyle {
    background: string;
    color: string;
}
