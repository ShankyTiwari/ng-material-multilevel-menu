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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDO0lBQUE7S0FzREM7SUFwREMsMENBQVUsR0FBVjtRQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQU0sUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBQ2xGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCwyQ0FBVyxHQUFYLFVBQVksS0FBd0I7UUFBcEMsaUJBT0M7UUFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBcUI7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxnREFBZ0IsR0FBaEIsVUFBaUIsSUFBcUIsRUFBRSxNQUFjO1FBQXRELGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBMkI7b0JBQ2pELE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUNELGtEQUFrQixHQUFsQixVQUFtQixLQUF3QixFQUFFLElBQVk7UUFDdkQsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDN0QsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNELHFEQUFxQixHQUFyQixVQUFzQixJQUF1QixFQUFFLElBQVk7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELGtHQUFrRztJQUNsRyx5REFBeUQ7SUFDekQsaURBQWlCLEdBQWpCO1FBQ0UsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOztJQXJEVSxxQkFBcUI7UUFIakMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLHFCQUFxQixDQXNEakM7Z0NBNUREO0NBNERDLEFBdERELElBc0RDO1NBdERZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vYXBwLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcbiAgZm91bmRMaW5rT2JqZWN0OiBNdWx0aWxldmVsTm9kZXM7XG4gIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcbiAgICBsZXQgdGV4dCA9ICcnO1xuICAgIGNvbnN0IHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuICBhZGRSYW5kb21JZChub2RlczogTXVsdGlsZXZlbE5vZGVzW10pOiB2b2lkIHtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gbm9kZUlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZWN1cnNpdmVDaGVja0xpbmsobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbbm9kZUluZGV4XTtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmIChlbmNvZGVVUkkobm9kZS5saW5rKSA9PT0gbGluaykge1xuICAgICAgICAgICAgdGhpcy5mb3VuZExpbmtPYmplY3QgPSBub2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUuaXRlbXMsIGxpbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRNYXRjaGVkT2JqZWN0QnlVcmwobm9kZTogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IE11bHRpbGV2ZWxOb2RlcyB7XG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XG4gICAgcmV0dXJuIHRoaXMuZm91bmRMaW5rT2JqZWN0O1xuICB9XG4gIC8vIG92ZXJyaWRlcyBrZXktdmFsdWUgcGlwZSdzIGRlZmF1bHQgcmVvcmRlcmluZyAoYnkga2V5KSBieSBpbXBsZW1lbnRpbmcgZHVtbXkgY29tcHJhcmVyIGZ1bmN0aW9uXG4gIC8vIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0tleVZhbHVlUGlwZSNkZXNjcmlwdGlvblxuICBrdkR1bW15Q29tcGFyZXJGbigpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIl19