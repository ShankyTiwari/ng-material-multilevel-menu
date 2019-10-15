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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFFaEMsVUFBVTs7WUFDSixJQUFJLEdBQUcsRUFBRTs7Y0FDUCxRQUFRLEdBQUcsZ0VBQWdFO1FBQ2pGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBQ0QsV0FBVyxDQUFDLEtBQXdCO1FBQ2xDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUNELGdCQUFnQixDQUFDLElBQXFCLEVBQUUsTUFBYztRQUNwRCxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O2dCQUFDLENBQUMsVUFBMkIsRUFBRSxFQUFFO29CQUNyRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsRUFBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Ozs7OztJQUNELGtCQUFrQixDQUFDLEtBQXdCLEVBQUUsSUFBWTtRQUN2RCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRTs7a0JBQ3ZELElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBQ0QscUJBQXFCLENBQUMsSUFBdUIsRUFBRSxJQUFZO1FBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUdELGlCQUFpQjtRQUNmLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBeERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7SUFFQyxnREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vYXBwLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpbGV2ZWxNZW51U2VydmljZSB7XHJcbiAgZm91bmRMaW5rT2JqZWN0OiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRleHQgPSAnJztcclxuICAgIGNvbnN0IHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBhZGRSYW5kb21JZChub2RlczogTXVsdGlsZXZlbE5vZGVzW10pOiB2b2lkIHtcclxuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xyXG4gICAgICBub2RlLmlkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFkZFJhbmRvbUlkKG5vZGUuaXRlbXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tJZChub2RlOiBNdWx0aWxldmVsTm9kZXMsIG5vZGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAobm9kZS5pZCA9PT0gbm9kZUlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBub2RlLml0ZW1zLnNvbWUoKG5lc3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ2hlY2tJZChuZXN0ZWROb2RlLCBub2RlSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlY3Vyc2l2ZUNoZWNrTGluayhub2RlczogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgbm9kZUluZGV4ID0gMDsgbm9kZUluZGV4IDwgbm9kZXMubGVuZ3RoOyBub2RlSW5kZXgrKykge1xyXG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbbm9kZUluZGV4XTtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgIGlmIChlbmNvZGVVUkkobm9kZS5saW5rKSA9PT0gbGluaykge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xyXG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XHJcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XHJcbiAgfVxyXG4gIC8vIG92ZXJyaWRlcyBrZXktdmFsdWUgcGlwZSdzIGRlZmF1bHQgcmVvcmRlcmluZyAoYnkga2V5KSBieSBpbXBsZW1lbnRpbmcgZHVtbXkgY29tcHJhcmVyIGZ1bmN0aW9uXHJcbiAgLy8gaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vS2V5VmFsdWVQaXBlI2Rlc2NyaXB0aW9uXHJcbiAga3ZEdW1teUNvbXBhcmVyRm4oKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn1cclxuIl19