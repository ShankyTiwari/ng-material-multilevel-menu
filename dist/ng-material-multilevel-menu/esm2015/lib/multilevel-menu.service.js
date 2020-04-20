/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MultilevelMenuService {
    /**
     * @return {?}
     */
    generateId() {
        /** @type {?} */
        let text = '';
        /** @type {?} */
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    addRandomId(nodes) {
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        }));
    }
    /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    recursiveCheckId(node, nodeId) {
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some((/**
                 * @param {?} nestedNode
                 * @return {?}
                 */
                (nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                }));
            }
        }
    }
    /**
     * @param {?} nodes
     * @param {?} link
     * @return {?}
     */
    recursiveCheckLink(nodes, link) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} link
     * @return {?}
     */
    getMatchedObjectByUrl(node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    /**
     * @return {?}
     */
    kvDummyComparerFn() {
        return 0;
    }
}
MultilevelMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ MultilevelMenuService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
if (false) {
    /** @type {?} */
    MultilevelMenuService.prototype.foundLinkObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFFaEMsVUFBVTs7WUFDSixJQUFJLEdBQUcsRUFBRTs7Y0FDUCxRQUFRLEdBQUcsZ0VBQWdFO1FBQ2pGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBQ0QsV0FBVyxDQUFDLEtBQXdCO1FBQ2xDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUNELGdCQUFnQixDQUFDLElBQXFCLEVBQUUsTUFBYztRQUNwRCxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O2dCQUFDLENBQUMsVUFBMkIsRUFBRSxFQUFFO29CQUNyRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsRUFBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Ozs7OztJQUNELGtCQUFrQixDQUFDLEtBQXdCLEVBQUUsSUFBWTtRQUN2RCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTs7a0JBQ3ZELElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBQ0QscUJBQXFCLENBQUMsSUFBdUIsRUFBRSxJQUFZO1FBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUdELGlCQUFpQjtRQUNmLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBeERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7SUFFQyxnREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpbGV2ZWxNZW51U2VydmljZSB7XG4gIGZvdW5kTGlua09iamVjdDogTXVsdGlsZXZlbE5vZGVzO1xuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBjb25zdCBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbiAgYWRkUmFuZG9tSWQobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdKTogdm9pZCB7XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XG4gICAgICBub2RlLmlkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmVjdXJzaXZlQ2hlY2tJZChub2RlOiBNdWx0aWxldmVsTm9kZXMsIG5vZGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKG5vZGUuaWQgPT09IG5vZGVJZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ2hlY2tJZChuZXN0ZWROb2RlLCBub2RlSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChsZXQgbm9kZUluZGV4ID0gMDsgbm9kZUluZGV4IDwgbm9kZXMubGVuZ3RoOyBub2RlSW5kZXgrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW25vZGVJbmRleF07XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAoZW5jb2RlVVJJKG5vZGUubGluaykgPT09IGxpbmspIHtcbiAgICAgICAgICAgIHRoaXMuZm91bmRMaW5rT2JqZWN0ID0gbm9kZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLml0ZW1zLCBsaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xuICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUsIGxpbmspO1xuICAgIHJldHVybiB0aGlzLmZvdW5kTGlua09iamVjdDtcbiAgfVxuICAvLyBvdmVycmlkZXMga2V5LXZhbHVlIHBpcGUncyBkZWZhdWx0IHJlb3JkZXJpbmcgKGJ5IGtleSkgYnkgaW1wbGVtZW50aW5nIGR1bW15IGNvbXByYXJlciBmdW5jdGlvblxuICAvLyBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9LZXlWYWx1ZVBpcGUjZGVzY3JpcHRpb25cbiAga3ZEdW1teUNvbXBhcmVyRm4oKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiJdfQ==