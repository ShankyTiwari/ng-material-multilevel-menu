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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRWhDLFVBQVU7UUFDUixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxNQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztRQUNsRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQXdCO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxJQUFxQixFQUFFLE1BQWM7UUFDcEQsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBMkIsRUFBRSxFQUFFO29CQUNyRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxLQUF3QixFQUFFLElBQVk7UUFDdkQsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDN0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNELHFCQUFxQixDQUFDLElBQXVCLEVBQUUsSUFBWTtRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsa0dBQWtHO0lBQ2xHLHlEQUF5RDtJQUN6RCxpQkFBaUI7UUFDZixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRixDQUFBOztBQXREWSxxQkFBcUI7SUFIakMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLHFCQUFxQixDQXNEakM7U0F0RFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xyXG4gIGZvdW5kTGlua09iamVjdDogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZXh0ID0gJyc7XHJcbiAgICBjb25zdCBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgYWRkUmFuZG9tSWQobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdKTogdm9pZCB7XHJcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgbm9kZS5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKG5vZGUuaWQgPT09IG5vZGVJZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNoZWNrSWQobmVzdGVkTm9kZSwgbm9kZUlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0xpbmsobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IG5vZGVzLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW25vZGVJbmRleF07XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBpZiAoZW5jb2RlVVJJKG5vZGUubGluaykgPT09IGxpbmspIHtcclxuICAgICAgICAgICAgdGhpcy5mb3VuZExpbmtPYmplY3QgPSBub2RlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUuaXRlbXMsIGxpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1hdGNoZWRPYmplY3RCeVVybChub2RlOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogTXVsdGlsZXZlbE5vZGVzIHtcclxuICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUsIGxpbmspO1xyXG4gICAgcmV0dXJuIHRoaXMuZm91bmRMaW5rT2JqZWN0O1xyXG4gIH1cclxuICAvLyBvdmVycmlkZXMga2V5LXZhbHVlIHBpcGUncyBkZWZhdWx0IHJlb3JkZXJpbmcgKGJ5IGtleSkgYnkgaW1wbGVtZW50aW5nIGR1bW15IGNvbXByYXJlciBmdW5jdGlvblxyXG4gIC8vIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL0tleVZhbHVlUGlwZSNkZXNjcmlwdGlvblxyXG4gIGt2RHVtbXlDb21wYXJlckZuKCkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcbiJdfQ==