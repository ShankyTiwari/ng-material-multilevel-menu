# ng-material-multilevel-menu

Material Multi-Level Menu for Angular Projects.

# Breaking Change
> From version 5.0.0, the `@Input` called `expandCollapseStatus` have been removed in favor [major bug](https://github.com/ShankyTiwari/ng-material-multilevel-menu/issues/131), please use the
`MultilevelMenuService`. You can find out the implementation of the same [here](https://github.com/ShankyTiwari/ng-material-multilevel-menu-demo/blob/master/src/app/pages/more-configuration/expand-collapse/expand-collapse.component.ts#L73).
>Thanks, 


## Why ng-material-multilevel-menu?

The main goal of this package is to deliver a slim and Skinny Material Multi-Level Menu for Angular Projects. That can fit into any kind of projects with no muss, no fuss. Within few lines, you will get an animation ready multilevel list that just works.

## Demo

Check the Material Multi-Level Menu in action, [click here](http://plugins.codershood.info/#/plugins/ngmm-plugin).

## Features
1. [Material Icons](https://material.io/tools/icons/?style=baseline) are supported.
2. [FontAwesome Icons](https://fontawesome.com/v4.7.0/icons/) are supported.
3. Use images as icons in the list.
4. Seamlessly work with Angular routing, if provided.
5. RTL supported ([thanks to StavM](https://github.com/StavM)).
6. Supports Custom List Templates
    1. [Demos](https://multilevel-menu-demo.web.app/pages/layout-variations/demo-six/version-one)
    2. [Documentation](#3-building-custom-templates)

## Installation
You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

#### NPM
```  
npm install --save ng-material-multilevel-menu
```
        
#### YARN
```          
yarn add --save ng-material-multilevel-menu
```
        
## Usage
Follow below steps to add multi level list in your project

#### 1. Import NgMaterialMultilevelMenuModule

You need to import the ```NgMaterialMultilevelMenuModule``` in the module of your app where you want to use it.

```typescript        
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Import the module*/
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
    AppComponent
    ],
    imports: [
    BrowserModule,
    NgMaterialMultilevelMenuModule // Import here
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```  

        
#### 2. Use <ng-material-multilevel-menu> in your HTML

In your HTML: Use the ```<ng-material-multilevel-menu>``` wherever you like in your project.

```html        
<ng-material-multilevel-menu  
    [configuration]='config' 
    [items]='appitems'
    (selectedItem)="selectedItem($event)" 
    (menuIsReady)="menuIsReady($event)" 
    (selectedLabel)="selectedLabel($event)">
</ng-material-multilevel-menu>
```
        
#### 3. Structure of array to display the list

Make sure you structure of array should look like array shown below,     
```typescript
appitems = [
    {
        label: 'NPM',
        imageIcon: '/assets/batman.jpg',
        link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
        externalRedirect: true,
        hrefTargetType: '_blank' // _blank|_self|_parent|_top|framename
    },
    {
        label: 'Item 1 (with Font awesome icon)',
        faIcon: 'fab fa-500px',
        items: [
            {
                label: 'Item 1.1',
                link: '/item-1-1',
                faIcon: 'fab fa-accusoft'
            },
            {
                label: 'Item 1.2',
                faIcon: 'fab fa-accessible-icon',
                disabled: true,
                items: [
                    {
                        label: 'Item 1.2.1',
                        link: '/item-1-2-1',
                        faIcon: 'fa-allergies' // Font awesome default prefix is fas
                    },
                    {
                        label: 'Item 1.2.2',
                        faIcon: 'fas fa-ambulance',
                        items: [
                            {
                                label: 'Item 1.2.2.1',
                                faIcon: 'fas fa-anchor',  // Still you can specify if you want to
                                onSelected: function() {
                                    console.log('Item 1.2.2.1');
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Item 2',
        icon: 'alarm',
        items: [
        {
            label: 'Item 2.1',
            link: '/item-2-1',
            icon: 'favorite_border',
            activeIcon: 'favorite',
            disabled: true,
        },
        {
            label: 'Item 2.2',
            link: '/item-2-2',
            icon: 'favorite_border',
            activeIcon: 'favorite',
            navigationExtras: {
                queryParams: { order: 'popular', filter: 'new' },
            }
        }
        ]
    },
    {
        label: 'Item 3',
        icon: 'offline_pin',
        onSelected: function() {
            console.log('Item 3');
        }
    },
    {
        label: 'Item 4',
        link: '/item-4',
        icon: 'star_rate',
        hidden: true
    }
];
```

## API
- Using ```configuration```, You can customise the appearance of the list.
    * ```paddingAtStart: boolean``` => *[optional]* If you don't want padding at the start of the list item, then you can give ```false```. The default value will be ```true```.
    * ```interfaceWithRoute: boolean``` => *[required]* only if you want to use Angular Routing with this menu.
    * ```highlightOnSelect: boolean``` => *[optional]* If you want to highlight the clicked item in the list, then you can do that by making it ```true```. The default value will be ```false```.
    * ```useDividers: boolean``` => *[optional]* If you want to the list to have dividers. The default value will be ```true```.
    * ```collapseOnSelect: boolean;``` => *[optional]* You have the option to collapse another parent when clicked on the current parent. The default value will be ```false```. 
    * ```rtlLayout: boolean;``` => *[optional]* whether display is Right To Left. The default value will be ```false```. 
    * ```classname: string;``` => *[optional]* You can give your own custom class name in order to modify the list appearance. 
    * ```listBackgroundColor: string;``` => *[optional]* You can apply custom color to the background of the list.
    * ```fontColor: string;``` => *[optional]* Changes the color of Text and icons inside the list.
    * ```backgroundColor: string;``` => *[optional]* This will change the background color list container.
    * ```selectedListFontColor: string;``` => *[optional]* This will change the font color of selected list item.

Below is example how you can apply different background and Font colors,
```typescript
config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `rgb(208, 241, 239)`,
    fontColor: `rgb(8, 54, 71)`,
    backgroundColor: `rgb(208, 241, 239)`,
    selectedListFontColor: `red`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false
};

```

## Misc

### 1. Exapand/ Collapse all Menu
You can expand all the menu and Collapse all the menus. Below is example how you can do that,
```typescript
import { MultilevelMenuService, ExpandCollapseStatusEnum } from 'ng-material-multilevel-menu';

export class AppComponent {
    constructor(
        private multilevelMenuService: MultilevelMenuService
    ) {}

    setExpandCollapseStatus(type: ExpandCollapseStatusEnum) {
        this.multilevelMenuService.setMenuExapandCollpaseStatus(type);
    }
}
```
### 2. Select Menu By ID
You can expand all the menu and Collapse all the menus. Below is example how you can do that,
```typescript
import { MultilevelMenuService, MultilevelNodes } from 'ng-material-multilevel-menu';

export class AppComponent {
    menuWithID: MultilevelNodes[] = null

    constructor(
        private multilevelMenuService: MultilevelMenuService
    ) {}

    menuIsReady(menus: MultilevelNodes[]) {
        this.menuWithID = menus;
    }

    selectMenuID(MenuID){
        this.multilevelMenuService.selectMenuByID(MenuID);
    }

}
```

### 3. Building Custom Templates
In this section, you will find useful information if you are planning to write your own templates.

1. First and very important is `MultilevelNodes` interface, every menu item implements this interface. Make sure you look into each property of this interface when building custom menu templates. For example properties like `isSelected`, `hasChilden`, `expanded`, `disabled`, `items`, `label`, and so on are extremely helpful, have look into some demos [here](https://multilevel-menu-demo.web.app/pages/layout-variations/demo-six/version-one).
2. You actually don't have to write *Slide-In*/ *Slide-Out*, *Arrow Rotation* animation. The module exports these animations out of the box, so you can import them and use it as shown below.

**demo.component.ts:**
```typescript
import {SlideInOut, ExpandedRTL, ExpandedLTR } from 'ng-material-multilevel-menu';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    animations: [
      SlideInOut,
      ExpandedLTR,
      ExpandedRTL,
    ]
})
```
3. You have decided to write a custom template, then you have to write the corresponding CSS for the same.
4. Below is a very simple example of the custom menu templates,

**demo.component.html:**
```html
 <ng-material-multilevel-menu [items]='appitems' [configuration]='config' (selectedItem)="selectedItem($event)">
    <ng-template #listTemplate let-item="item" let-configuration="configuration">
        <div class="my-cool-menu-item" [dir]="configuration.rtlLayout  ? 'rtl' : 'ltr'">
            <div class="title-and-image">
                <div class="icon-container">
                    <span [ngClass]="getClass(item)"></span>
                </div>
                <div class="label-container">
                    <span>{{item.label}}</span>
                </div>
            </div>
            <div class="icon-arrow-container" *ngIf='item.hasChilden'>
                <mat-icon *ngIf="!configuration.rtlLayout" [@ExpandedLTR]="item.expanded ? 'yes' : 'no'">
                    keyboard_arrow_down
                </mat-icon>
                <mat-icon *ngIf="configuration.rtlLayout" [@ExpandedRTL]="item.expanded ? 'yes' : 'no'">
                    keyboard_arrow_down
                </mat-icon>
            </div>
        </div>
    </ng-template>
</ng-material-multilevel-menu>
```

**demo.component.ts:**
```typescript
import { Component } from '@angular/core';

import { MultilevelNodes, Configuration, ExpandedRTL, ExpandedLTR } from 'ng-material-multilevel-menu';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    animations: [ExpandedRTL, ExpandedLTR]
})
export class DemoComponent  {
    appitems: MultilevelNodes[] = [
        ...
        {
        label: 'Item 3',
        faIcon: 'fas fa-anchor',
        }
        ...
    ];

    config: Configuration = {
        rtlLayout: true,
        customTemplate: true,
    }

    constructor() { }

    getClass(item) {
        return {
            [item.faIcon]: true
        }
    }

    selectedItem($event) {
        console.log($event);
    }
}
```

**demo.component.css:**
```css

.my-cool-menu-item {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: solid 1px rgba(0,0,0,.12);
    height: 48px;
}

.my-cool-menu-item .title-and-image {
    width: 100%;
    display: flex;
    justify-content: flex-start;
}

.my-cool-menu-item .title-and-image .icon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

div[dir=rtl] .icon-container {
    padding-left: 5px;
}

div[dir=ltr] .icon-container {
    padding-right: 5px;
}

.my-cool-menu-item .title-and-image .label-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.my-cool-menu-item .icon-arrow-container {
    display: flex;
    align-items: center;
}
```
	


## Default classes
* ```selected-amml-item```: This class will be applied to currently selected link and it's father links.
* ```active-amml-item```: This class will be applied to currently selected link.

## Dependencies
1. [Angular Material](https://material.angular.io)

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/ng-material-multilevel-menu/issues).

## License

MIT
