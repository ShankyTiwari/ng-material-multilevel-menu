import {
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Input,
} from "@angular/core";
import { MultilevelNodes } from "./app.model";

@Component({
  selector: "my-component",
  template: `
    <a> {{ node.label | json }}</a>
    <ng-content></ng-content>
  `
})
export class MenuLinkDirectiveComponent {
  node: MultilevelNodes
}

@Directive({ selector: "[menuLink]" })
export class MenuLinkDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) {}

  componentInstance: ComponentRef<MenuLinkDirectiveComponent> = null

  private _node: MultilevelNodes = null;
  @Input()
  set menuLink(value: MultilevelNodes) {
    if (value == undefined) {
      value = null;
    }
    this._node = value;
  }

  // @Input()
  // set menuLink(value: MultilevelNodes) {
  //   if (value == undefined) {
  //     value = null;
  //   }
  //   this._node = value;
  // }

  ngOnInit() {
    const templateView = this.templateRef.createEmbeddedView({});
    const compFactory = this.resolver.resolveComponentFactory(MenuLinkDirectiveComponent);
    this.componentInstance = this.viewContainer.createComponent(
      compFactory,
      null,
      this.viewContainer.injector,
      [templateView.rootNodes]
    );
    this.componentInstance.instance['node'] = this._node;
    // this.componentInstance.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
  }
}