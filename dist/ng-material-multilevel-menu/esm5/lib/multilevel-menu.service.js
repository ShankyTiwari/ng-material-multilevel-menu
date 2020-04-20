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
    MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
    MultilevelMenuService.ɵprov = i0.ɵɵdefineInjectable({ token: MultilevelMenuService, factory: MultilevelMenuService.ɵfac, providedIn: 'root' });
    return MultilevelMenuService;
}());
export { MultilevelMenuService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MultilevelMenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0M7SUFBQTtLQXlEQztJQXBEQywwQ0FBVSxHQUFWO1FBQ0UsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBTSxRQUFRLEdBQUcsZ0VBQWdFLENBQUM7UUFDbEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELDJDQUFXLEdBQVgsVUFBWSxLQUF3QjtRQUFwQyxpQkFPQztRQU5DLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFxQjtZQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM1QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGdEQUFnQixHQUFoQixVQUFpQixJQUFxQixFQUFFLE1BQWM7UUFBdEQsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUEyQjtvQkFDakQsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDO0lBQ0Qsa0RBQWtCLEdBQWxCLFVBQW1CLEtBQXdCLEVBQUUsSUFBWTtRQUN2RCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUM3RCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7cUJBQzdCO3lCQUFNO3dCQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUMzQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QscURBQXFCLEdBQXJCLFVBQXNCLElBQXVCLEVBQUUsSUFBWTtRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsa0dBQWtHO0lBQ2xHLHlEQUF5RDtJQUN6RCxpREFBaUIsR0FBakI7UUFDRSxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7OEZBckRVLHFCQUFxQjtpRUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQixtQkFGcEIsTUFBTTtnQ0FKcEI7Q0E0REMsQUF6REQsSUF5REM7U0F0RFkscUJBQXFCO2tEQUFyQixxQkFBcUI7Y0FIakMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xuICAgICAgbm9kZS5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmFkZFJhbmRvbUlkKG5vZGUuaXRlbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBub2RlLml0ZW1zLnNvbWUoKG5lc3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNoZWNrSWQobmVzdGVkTm9kZSwgbm9kZUlkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlY3Vyc2l2ZUNoZWNrTGluayhub2RlczogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IG5vZGVzLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xuICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKGVuY29kZVVSSShub2RlLmxpbmspID09PSBsaW5rKSB7XG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldE1hdGNoZWRPYmplY3RCeVVybChub2RlOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogTXVsdGlsZXZlbE5vZGVzIHtcbiAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLCBsaW5rKTtcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XG4gIH1cbiAgLy8gb3ZlcnJpZGVzIGtleS12YWx1ZSBwaXBlJ3MgZGVmYXVsdCByZW9yZGVyaW5nIChieSBrZXkpIGJ5IGltcGxlbWVudGluZyBkdW1teSBjb21wcmFyZXIgZnVuY3Rpb25cbiAgLy8gaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vS2V5VmFsdWVQaXBlI2Rlc2NyaXB0aW9uXG4gIGt2RHVtbXlDb21wYXJlckZuKCkge1xuICAgIHJldHVybiAwO1xuICB9XG59XG4iXX0=