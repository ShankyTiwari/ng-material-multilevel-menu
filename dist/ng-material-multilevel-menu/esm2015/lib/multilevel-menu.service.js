/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
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
                return node.items.some((nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                });
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
}
MultilevelMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ MultilevelMenuService.ngInjectableDef = i0.defineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
if (false) {
    /** @type {?} */
    MultilevelMenuService.prototype.foundLinkObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFFaEMsVUFBVTs7WUFDSixJQUFJLEdBQUcsRUFBRTs7Y0FDUCxRQUFRLEdBQUcsZ0VBQWdFO1FBQ2pGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBQ0QsV0FBVyxDQUFDLEtBQXdCO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUNELGdCQUFnQixDQUFDLElBQXFCLEVBQUUsTUFBYztRQUNwRCxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUEyQixFQUFFLEVBQUU7b0JBQ3JELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBQ0Qsa0JBQWtCLENBQUMsS0FBd0IsRUFBRSxJQUFZO1FBQ3ZELEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFOztrQkFDdkQsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDN0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7cUJBQzdCO3lCQUFNO3dCQUNMLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUMzQztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFDRCxxQkFBcUIsQ0FBQyxJQUF1QixFQUFFLElBQVk7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQzs7O1lBbkRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7SUFFQyxnREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vYXBwLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpbGV2ZWxNZW51U2VydmljZSB7XHJcbiAgZm91bmRMaW5rT2JqZWN0OiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRleHQgPSAnJztcclxuICAgIGNvbnN0IHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBhZGRSYW5kb21JZChub2RlczogTXVsdGlsZXZlbE5vZGVzW10pOiB2b2lkIHtcclxuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xyXG4gICAgICBub2RlLmlkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmFkZFJhbmRvbUlkKG5vZGUuaXRlbXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tJZChub2RlOiBNdWx0aWxldmVsTm9kZXMsIG5vZGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAobm9kZS5pZCA9PT0gbm9kZUlkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBub2RlLml0ZW1zLnNvbWUoKG5lc3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ2hlY2tJZChuZXN0ZWROb2RlLCBub2RlSWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlY3Vyc2l2ZUNoZWNrTGluayhub2RlczogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgbm9kZUluZGV4ID0gMDsgbm9kZUluZGV4IDwgbm9kZXMubGVuZ3RoOyBub2RlSW5kZXgrKykge1xyXG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbbm9kZUluZGV4XTtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgIGlmIChlbmNvZGVVUkkobm9kZS5saW5rKSA9PT0gbGluaykge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xyXG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XHJcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XHJcbiAgfVxyXG59XHJcbiJdfQ==