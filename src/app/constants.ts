export const constant = {
    sidebarDemoLinks: [
        {
            label: 'Home',
            link: '/',
            icon: 'favorite',
            activeIcon: 'favorite_border',

        },
        {
            label: 'Item 1 (with Font awesome icon)',
            svgIcon: 'psychology',
            activeSvgIcon: 'activePsychology',
            items: [
                {
                    label: 'Alter Configurations',
                    faIcon: 'fa fa-address-book',
                    activeFaIcon: 'fa fa-id-card',
                    items: [
                        {
                            label: 'Default',
                            link: '/demo-one',
                            icon: 'favorite',
                            activeIcon: 'favorite_border',
                            disabled: true,

                        },
                        {
                            label: 'Changing Colours',
                            link: '/demo two',
                            icon: 'favorite_border',
                            activeIcon: 'favorite',
                            dontEmit: true,
                            navigationExtras: {
                                queryParams: { order: 'popular', filter: 'new' },
                            }
                        },
                        {
                            label: 'Changing Padding',
                            link: '/demo/12',
                            icon: 'favorite_border',
                            activeIcon: 'favorite'
                        },
                        {
                            label: 'Changing Background',
                            link: '/demo',
                            imageIcon: '/assets/batman.jpg',
                            activeImageIcon: '/assets/blackpanther.jpg',
                        }
                    ]
                },
                {
                    label: 'Alter Items Array',
                    icon: 'alarm',
                    items: [
                        {
                            label: 'Default',
                            icon: 'favorite'
                        },
                        {
                            label: 'Remote Json',
                            icon: 'favorite_border',
                            disabled: true,
                        },
                        {
                            label: 'Dynamic arrays',
                            icon: 'favorite_border'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Item 2',
            faIcon: 'fas fa-anchor', 
            items: [
                {
                    label: 'Item 2.1',
                    faIcon: 'fab fa-accusoft',
                    activeFaIcon: 'fab fa-accusoft',
                    disabled: true,
                },
                {
                    label: 'Item 2.2',
                    faIcon: 'fas fa-anchor', 
                    activeFaIcon: 'fab fa-accusoft',
                    items: [
                        {
                            label: 'Item 2',
                            faIcon: 'fas fa-anchor', 
                            items: [
                                {
                                    label: 'Item 2.1',
                                    faIcon: 'fab fa-accusoft',
                                    activeFaIcon: 'fab fa-accusoft',
                                    disabled: true,
                                },
                                {
                                    label: 'Item 2.2',
                                    faIcon: 'fas fa-anchor', 
                                    activeFaIcon: 'fab fa-accusoft',
                                    dontEmit: true,
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            label: 'NPM',
            icon: 'info_outline',
            link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
            externalRedirect: true,
            hrefTargetType: '_blank'
        }
    ],
    customTemplateLinks: [
        {
            label: 'Item 1',
            faIcon: 'fas fa-anchor', 
            items: [
                {
                    label: 'Item 1.1',
                    faIcon: 'fab fa-accusoft',
                    activeFaIcon: 'fab fa-accusoft',
                },
                {
                    label: 'Item 1.2',
                    faIcon: 'fas fa-anchor', 
                    activeFaIcon: 'fab fa-accusoft',
                    items: [
                        {
                            label: 'Item 1.2.1',
                            faIcon: 'fas fa-anchor', 
                            items: [
                                {
                                    label: 'Item 1.2.1.1',
                                    faIcon: 'fab fa-accusoft',
                                    activeFaIcon: 'fab fa-accusoft',
                                },
                                {
                                    label: 'Item 1.2.1.2',
                                    faIcon: 'fas fa-anchor', 
                                    activeFaIcon: 'fab fa-accusoft',
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'Item 1.3',
                    faIcon: 'fas fa-anchor', 
                    activeFaIcon: 'fab fa-accusoft',
                    items: [
                        {
                            label: 'Item 1.3.1',
                            faIcon: 'fas fa-anchor', 
                            items: [
                                {
                                    label: 'Item 1.3.1.1',
                                    faIcon: 'fab fa-accusoft',
                                    activeFaIcon: 'fab fa-accusoft',
                                },
                                {
                                    label: 'Item 1.3.1.2',
                                    faIcon: 'fas fa-anchor', 
                                    activeFaIcon: 'fab fa-accusoft',
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            label: 'NPM',
            faIcon: 'fas fa-anchor',
            link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
            externalRedirect: true,
            hrefTargetType: '_blank'
        }
    ],
    sidebarConfigurations: {
        paddingAtStart: false,
        interfaceWithRoute: true,
        // rtlLayout: true,
        // collapseOnSelect: true,
        customTemplate: true,
    }
};
