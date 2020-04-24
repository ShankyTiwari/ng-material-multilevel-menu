import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var MultilevelMenuService = /** @class */ (function () {
    function MultilevelMenuService() {
    }
    MultilevelMenuService.prototype.generateId = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    MultilevelMenuService.prototype.addRandomId = function (nodes) {
        var _this = this;
        nodes.forEach(function (node) {
            node.id = _this.generateId();
            if (node.items !== undefined) {
                _this.addRandomId(node.items);
            }
        });
    };
    MultilevelMenuService.prototype.recursiveCheckId = function (node, nodeId) {
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
    MultilevelMenuService.prototype.recursiveCheckLink = function (nodes, link) {
        for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            var node = nodes[nodeIndex];
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    if (encodeURI(node.link) === link) {
                        this.foundLinkObject = node;
                    }
                    else {
                        if (node.items !== undefined) {
                            this.recursiveCheckLink(node.items, link);
                        }
                    }
                }
            }
        }
    };
    MultilevelMenuService.prototype.getMatchedObjectByUrl = function (node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    };
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    MultilevelMenuService.prototype.kvDummyComparerFn = function () {
        return 0;
    };
    MultilevelMenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
    MultilevelMenuService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], MultilevelMenuService);
    return MultilevelMenuService;
}());
export { MultilevelMenuService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDO0lBQUE7S0FzREM7SUFwREMsMENBQVUsR0FBVjtRQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQU0sUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBQ2xGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCwyQ0FBVyxHQUFYLFVBQVksS0FBd0I7UUFBcEMsaUJBT0M7UUFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBcUI7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxnREFBZ0IsR0FBaEIsVUFBaUIsSUFBcUIsRUFBRSxNQUFjO1FBQXRELGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBMkI7b0JBQ2pELE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUNELGtEQUFrQixHQUFsQixVQUFtQixLQUF3QixFQUFFLElBQVk7UUFDdkQsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDN0QsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNELHFEQUFxQixHQUFyQixVQUFzQixJQUF1QixFQUFFLElBQVk7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELGtHQUFrRztJQUNsRyx5REFBeUQ7SUFDekQsaURBQWlCLEdBQWpCO1FBQ0UsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOztJQXJEVSxxQkFBcUI7UUFIakMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLHFCQUFxQixDQXNEakM7Z0NBNUREO0NBNERDLEFBdERELElBc0RDO1NBdERZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcclxuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcclxuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dCA9ICcnO1xyXG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgaWYgKGVuY29kZVVSSShub2RlLmxpbmspID09PSBsaW5rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm91bmRMaW5rT2JqZWN0ID0gbm9kZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLml0ZW1zLCBsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXRjaGVkT2JqZWN0QnlVcmwobm9kZTogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IE11bHRpbGV2ZWxOb2RlcyB7XHJcbiAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLCBsaW5rKTtcclxuICAgIHJldHVybiB0aGlzLmZvdW5kTGlua09iamVjdDtcclxuICB9XHJcbiAgLy8gb3ZlcnJpZGVzIGtleS12YWx1ZSBwaXBlJ3MgZGVmYXVsdCByZW9yZGVyaW5nIChieSBrZXkpIGJ5IGltcGxlbWVudGluZyBkdW1teSBjb21wcmFyZXIgZnVuY3Rpb25cclxuICAvLyBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9LZXlWYWx1ZVBpcGUjZGVzY3JpcHRpb25cclxuICBrdkR1bW15Q29tcGFyZXJGbigpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxufVxyXG4iXX0=