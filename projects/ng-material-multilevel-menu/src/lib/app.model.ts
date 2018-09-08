export interface MultilevelNodes {
    id: string;
    label: string;
    faIcon?: string;
    icon?: string;
    hidden?: boolean;
    link?: string;
    externalRedirect?: boolean;
    data: any;
    items?: MultilevelNodes[];
    onSelected?: Function;
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
}

export interface BackgroundStyle {
    background: string;
}

export interface ListStyle {
    background: string;
    color: string;
}
