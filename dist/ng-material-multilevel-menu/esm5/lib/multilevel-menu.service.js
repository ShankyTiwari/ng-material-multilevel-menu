/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as i0 from "@angular/core";
var MultilevelMenuService = /** @class */ (function () {
    function MultilevelMenuService() {
        this.isLastItemClikedStorage = new BehaviorSubject(false);
        this.isLastItemCliked = this.isLastItemClikedStorage.asObservable();
    }
    /**
     * @return {?}
     */
    MultilevelMenuService.prototype.generateId = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ text = '';
        var /** @type {?} */ possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var /** @type {?} */ i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    MultilevelMenuService.prototype.addRandomId = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        nodes.forEach(function (node, index) {
            node.id = _this.generateId();
            if (node.items !== undefined) {
                _this.addRandomId(node.items);
            }
        });
    };
    /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    MultilevelMenuService.prototype.recursiveCheckId = /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    function (node, nodeId) {
        var _this = this;
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some(function (nestedNode) {
                    return _this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    };
    /**
     * @param {?} isCliked
     * @return {?}
     */
    MultilevelMenuService.prototype.updateClickedItem = /**
     * @param {?} isCliked
     * @return {?}
     */
    function (isCliked) {
        this.isLastItemClikedStorage.next(isCliked);
    };
    MultilevelMenuService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ MultilevelMenuService.ngInjectableDef = i0.defineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
    return MultilevelMenuService;
}());
export { MultilevelMenuService };
function MultilevelMenuService_tsickle_Closure_declarations() {
    /** @type {?} */
    MultilevelMenuService.prototype.isLastItemClikedStorage;
    /** @type {?} */
    MultilevelMenuService.prototype.isLastItemCliked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O3VDQVNwQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUM7Z0NBQ1osSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRTs7Ozs7SUFDbkYsMENBQVU7OztJQUFWO1FBQ0UscUJBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLHFCQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztRQUNsRixHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFDRCwyQ0FBVzs7OztJQUFYLFVBQVksS0FBd0I7UUFBcEMsaUJBT0M7UUFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBcUIsRUFBRSxLQUFLO1lBQ3pDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBQ0QsZ0RBQWdCOzs7OztJQUFoQixVQUFpQixJQUFxQixFQUFFLE1BQWM7UUFBdEQsaUJBVUM7UUFUQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQTJCO29CQUNqRCxNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDbEQsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtLQUNGOzs7OztJQUNELGlEQUFpQjs7OztJQUFqQixVQUFrQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdDOztnQkFuQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dDQVJEOztTQVNhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xuICBpc0xhc3RJdGVtQ2xpa2VkU3RvcmFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBpc0xhc3RJdGVtQ2xpa2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5pc0xhc3RJdGVtQ2xpa2VkU3RvcmFnZS5hc09ic2VydmFibGUoKTtcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcywgaW5kZXgpID0+IHtcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gbm9kZUlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB1cGRhdGVDbGlja2VkSXRlbShpc0NsaWtlZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNMYXN0SXRlbUNsaWtlZFN0b3JhZ2UubmV4dChpc0NsaWtlZCk7XG4gIH1cbn1cbiJdfQ==