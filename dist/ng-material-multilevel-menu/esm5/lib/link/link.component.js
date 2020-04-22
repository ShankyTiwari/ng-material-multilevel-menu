import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var LinkComponent = /** @class */ (function () {
    function LinkComponent() {
    }
    LinkComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LinkComponent.prototype, "isLinkExternal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LinkComponent.prototype, "link", void 0);
    LinkComponent = __decorate([
        Component({
            selector: 'ng-link',
            template: "<a *ngIf=\"isLinkExternal\" [href]=\"link\">\n  <ng-container *ngTemplateOutlet=\"tempOutlet\"></ng-container>\n</a>\n\n<a *ngIf=\"!isLinkExternal\" [routerLink]=\"link\">\n  <ng-container *ngTemplateOutlet=\"tempOutlet\"></ng-container>\n</a>\n\n<ng-template #tempOutlet>\n  <ng-content></ng-content>\n</ng-template>\n",
            styles: [":host{width:100%}a{text-decoration:none;color:inherit}"]
        }),
        __metadata("design:paramtypes", [])
    ], LinkComponent);
    return LinkComponent;
}());
export { LinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFPekQ7SUFLRTtJQUFnQixDQUFDO0lBRWpCLGdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBTlE7UUFBUixLQUFLLEVBQUU7O3lEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7K0NBQWM7SUFIWCxhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLDJVQUFvQzs7U0FFckMsQ0FBQzs7T0FDVyxhQUFhLENBVXpCO0lBQUQsb0JBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmsuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpbmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGlzTGlua0V4dGVybmFsOiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5rOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=