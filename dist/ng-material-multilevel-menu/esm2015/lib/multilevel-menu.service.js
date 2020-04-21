import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let MultilevelMenuService = class MultilevelMenuService {
    generateId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    addRandomId(nodes) {
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
    }
    recursiveCheckId(node, nodeId) {
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some((nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    }
    recursiveCheckLink(nodes, link) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            const node = nodes[nodeIndex];
            for (const key in node) {
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
    }
    getMatchedObjectByUrl(node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    kvDummyComparerFn() {
        return 0;
    }
};
MultilevelMenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
MultilevelMenuService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MultilevelMenuService);
export { MultilevelMenuService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRWhDLFVBQVU7UUFDUixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztRQUNsRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQXdCO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxJQUFxQixFQUFFLE1BQWM7UUFDcEQsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBMkIsRUFBRSxFQUFFO29CQUNyRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxLQUF3QixFQUFFLElBQVk7UUFDdkQsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDN0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNELHFCQUFxQixDQUFDLElBQXVCLEVBQUUsSUFBWTtRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsa0dBQWtHO0lBQ2xHLHlEQUF5RDtJQUN6RCxpQkFBaUI7UUFDZixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRixDQUFBOztBQXREWSxxQkFBcUI7SUFIakMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLHFCQUFxQixDQXNEakM7U0F0RFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xuICAgICAgbm9kZS5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmFkZFJhbmRvbUlkKG5vZGUuaXRlbXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBub2RlLml0ZW1zLnNvbWUoKG5lc3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNoZWNrSWQobmVzdGVkTm9kZSwgbm9kZUlkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlY3Vyc2l2ZUNoZWNrTGluayhub2RlczogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IG5vZGVzLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xuICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKGVuY29kZVVSSShub2RlLmxpbmspID09PSBsaW5rKSB7XG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldE1hdGNoZWRPYmplY3RCeVVybChub2RlOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogTXVsdGlsZXZlbE5vZGVzIHtcbiAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLCBsaW5rKTtcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XG4gIH1cbiAgLy8gb3ZlcnJpZGVzIGtleS12YWx1ZSBwaXBlJ3MgZGVmYXVsdCByZW9yZGVyaW5nIChieSBrZXkpIGJ5IGltcGxlbWVudGluZyBkdW1teSBjb21wcmFyZXIgZnVuY3Rpb25cbiAgLy8gaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vS2V5VmFsdWVQaXBlI2Rlc2NyaXB0aW9uXG4gIGt2RHVtbXlDb21wYXJlckZuKCkge1xuICAgIHJldHVybiAwO1xuICB9XG59XG4iXX0=