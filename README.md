# ng-material-multilevel-menu

Material Multi-Level Menu for Angular Projects.

## Why ng-material-multilevel-menu?

The main goal of this package is to deliver a slim and Skinny Material Multi-Level Menu for Angular Projects. That can fit into any kind of projects with no muss, no fuss. Within few lines, you will get an animation ready multilevel list that just works.

## Demo

Check the Material Multi-Level Menu in action, [click here](http://plugins.codershood.info/).

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
<ng-material-multilevel-menu [items]='appitems' (selectedItem)="selectedItem($event)"></ng-material-multilevel-menu>
```
        
#### 3. Structure of array to display the list

Make sure you structure of array should look like array shown below,     
```typescript
appitems = [
    {
        label: 'Item 1',
        icon: 'offline_bolt',
        items: [
        {
            label: 'Item 1.1',
            link: '/item-1-1',
            icon: 'pan_tool'
        },
        {
            label: 'Item 1.2',
            icon: 'payment',
            items: [
            {
                label: 'Item 1.2.1',
                link: '/item-1-2-1',
                icon: 'perm_scan_wifi'
            },
            {
                label: 'Item 1.2.2',
                icon: 'restore',
                items: [
                {
                    label: 'Item 1.2.2.1',
                    link: 'item-1-2-2-1',
                    icon: 'room'
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
            icon: 'favorite'
        },
        {
            label: 'Item 2.2',
            link: '/item-2-2',
            icon: 'favorite_border'
        }
        ]
    },
    {
        label: 'Item 3',
        link: '/item-3',
        icon: 'offline_pin'
    },
    {
        label: 'Item 4',
        link: '/item-4',
        icon: 'star_rate',
        hidden: true
    }
];
```

        
## Dependencies
1. [Material Icons](https://material.io/tools/icons/?style=baseline)
2. [Angular Material](https://material.angular.io)

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/ShankyTiwari/ng-material-multilevel-menu/issues).

## Leicense

MIT