import {
    Component,
    OnChanges,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
    Input,
    ContentChild,
    TemplateRef,
    ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Configuration, MultilevelNode, ExpandCollapseStatusEnum, ListStyle } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
import { CommonUtils } from './common-utils';

@Component({
    selector: 'ng-material-multilevel-menu',
    templateUrl: './ng-material-multilevel-menu.component.html',
    styleUrls: ['./ng-material-multilevel-menu.component.css'],
})
export class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges, OnDestroy {
    @Input() items: MultilevelNode[];
    @Input() configuration: Configuration = null;
    @Output() selectedItem = new EventEmitter<MultilevelNode>();
    @Output() selectedLabel = new EventEmitter<MultilevelNode>();
    @Output() menuIsReady = new EventEmitter<MultilevelNode[]>();
    @ContentChild('listTemplate', { static: true }) listTemplate: TemplateRef<ElementRef>;

    private readonly stringConfigProperties = [
        'classname',
        'backgroundColor',
        'listBackgroundColor',
        'fontColor',
        'selectedListFontColor',
    ];

    private destroyed$ = new Subject<void>();

    currentNode: MultilevelNode = null;

    nodeConfig: Configuration = {
        paddingAtStart: true,
        listBackgroundColor: null,
        fontColor: null,
        selectedListFontColor: null,
        interfaceWithRoute: null,
        collapseOnSelect: null,
        highlightOnSelect: false,
        useDividers: true,
        rtlLayout: false,
        customTemplate: false,
    };

    isInvalidConfig = true;
    isInvalidData = true;
    nodeExpandCollapseStatus: ExpandCollapseStatusEnum = ExpandCollapseStatusEnum.neutral;

    constructor(private router: Router, public multilevelMenuService: MultilevelMenuService) {}

    ngOnInit() {
        this.subscribeToRouterEvents();
    }

    ngOnChanges() {
        this.checkConfigAndData();
        this.initExpandCollapseStatus();
        this.initSelectedMenuID();

        if (!this.isInvalidData) {
            this.menuIsReady.emit(this.items);
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    subscribeToRouterEvents() {
        if (this.configuration?.interfaceWithRoute === false) {
            return;
        }

        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateNodeByURL(event.urlAfterRedirects);
            }
        });
        this.updateNodeByURL(this.router.url);
    }

    updateNodeByURL(url: string): void {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);

        if (!foundNode || CommonUtils.isNullOrUndefinedOrEmpty(foundNode.link)) {
            return;
        }

        this.currentNode = foundNode;
        if (CommonUtils.isNullOrUndefined(foundNode.dontEmit) || foundNode.dontEmit) {
            return;
        }

        this.selectedListItem(foundNode);
    }

    checkConfigAndData(): void {
        this.detectInvalidConfig();
        this.checkValidData();
    }

    checkValidData(): void {
        if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
            return;
        }
        this.items = this.items.filter((item) => !item.hidden);
        this.multilevelMenuService.addRandomId(this.items);
        this.isInvalidData = false;
    }

    detectInvalidConfig(): void {
        if (CommonUtils.isNullOrUndefinedOrEmpty(this.configuration)) {
            this.isInvalidConfig = true;
            return;
        }
        this.isInvalidConfig = false;
        const config = this.configuration;

        for (const property of Object.keys(config)) {
            this.stringConfigProperties.some((item) => item === property)
                ? this.setStringConfigProperty(property, config[property])
                : this.setBooleanConfigProperty(property, config[property]);
        }
    }

    initExpandCollapseStatus(): void {
        this.multilevelMenuService.expandCollapseStatus$.pipe(takeUntil(this.destroyed$)).subscribe({
            next: (expandCollapseStatus: ExpandCollapseStatusEnum) => {
                this.nodeExpandCollapseStatus = expandCollapseStatus ? expandCollapseStatus : ExpandCollapseStatusEnum.neutral;
            },
            error: () => {
                this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
            },
        });
    }

    initSelectedMenuID(): void {
        this.multilevelMenuService.selectedMenuID$.pipe(takeUntil(this.destroyed$)).subscribe((selectedMenuID: string) => {
            if (selectedMenuID) {
                const foundNode = this.multilevelMenuService.getMatchedObjectById(this.items, selectedMenuID);
                if (!foundNode) {
                    return;
                }
                this.currentNode = foundNode;
                this.selectedListItem(foundNode);
            }
        });
    }

    getClassName(): string {
        return this.isInvalidConfig || CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.classname)
            ? CONSTANT.DEFAULT_CLASS_NAME
            : `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
    }

    getGlobalStyle(): ListStyle {
        const styles = {
            backgroundColor: null,
        };

        if (this.isInvalidConfig || CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.backgroundColor)) {
            return styles;
        }

        styles.backgroundColor = this.configuration.backgroundColor;

        return styles;
    }

    isRtlLayout(): boolean {
        return this.nodeConfig.rtlLayout;
    }

    selectedListItem(event: MultilevelNode): void {
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.currentNode = event;
        if (!CommonUtils.isNullOrUndefined(event.dontEmit) && event.dontEmit) {
            return;
        }

        event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')
            ? this.selectedItem.emit(event)
            : this.selectedLabel.emit(event);
    }

    private setStringConfigProperty(propertyName: string, value: string): void {
        if (CommonUtils.isNullOrUndefinedOrEmpty(value)) {
            return;
        }

        this.nodeConfig[propertyName] = value;
    }

    private setBooleanConfigProperty(propertyName: string, value: boolean): void {
        if (CommonUtils.isNullOrUndefined(value) || typeof value !== 'boolean') {
            return;
        }

        this.nodeConfig[propertyName] = value;
    }
}
