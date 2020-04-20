import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MultilevelMenuService {
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
}
MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
MultilevelMenuService.ɵprov = i0.ɵɵdefineInjectable({ token: MultilevelMenuService, factory: MultilevelMenuService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MultilevelMenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvIiwic291cmNlcyI6WyJsaWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQyxVQUFVO1FBQ1IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsTUFBTSxRQUFRLEdBQUcsZ0VBQWdFLENBQUM7UUFDbEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUF3QjtRQUNsQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBcUIsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsSUFBcUIsRUFBRSxNQUFjO1FBQ3BELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQTJCLEVBQUUsRUFBRTtvQkFDckQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsS0FBd0IsRUFBRSxJQUFZO1FBQ3ZELEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQzdELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM1QixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztxQkFDN0I7eUJBQU07d0JBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTs0QkFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQzNDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFDRCxxQkFBcUIsQ0FBQyxJQUF1QixFQUFFLElBQVk7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELGtHQUFrRztJQUNsRyx5REFBeUQ7SUFDekQsaUJBQWlCO1FBQ2YsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzswRkFyRFUscUJBQXFCOzZEQUFyQixxQkFBcUIsV0FBckIscUJBQXFCLG1CQUZwQixNQUFNO2tEQUVQLHFCQUFxQjtjQUhqQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpbGV2ZWxNZW51U2VydmljZSB7XG4gIGZvdW5kTGlua09iamVjdDogTXVsdGlsZXZlbE5vZGVzO1xuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBjb25zdCBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbiAgYWRkUmFuZG9tSWQobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdKTogdm9pZCB7XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XG4gICAgICBub2RlLmlkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmVjdXJzaXZlQ2hlY2tJZChub2RlOiBNdWx0aWxldmVsTm9kZXMsIG5vZGVJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKG5vZGUuaWQgPT09IG5vZGVJZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ2hlY2tJZChuZXN0ZWROb2RlLCBub2RlSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChsZXQgbm9kZUluZGV4ID0gMDsgbm9kZUluZGV4IDwgbm9kZXMubGVuZ3RoOyBub2RlSW5kZXgrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW25vZGVJbmRleF07XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XG4gICAgICAgIGlmIChub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAoZW5jb2RlVVJJKG5vZGUubGluaykgPT09IGxpbmspIHtcbiAgICAgICAgICAgIHRoaXMuZm91bmRMaW5rT2JqZWN0ID0gbm9kZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLml0ZW1zLCBsaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xuICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUsIGxpbmspO1xuICAgIHJldHVybiB0aGlzLmZvdW5kTGlua09iamVjdDtcbiAgfVxuICAvLyBvdmVycmlkZXMga2V5LXZhbHVlIHBpcGUncyBkZWZhdWx0IHJlb3JkZXJpbmcgKGJ5IGtleSkgYnkgaW1wbGVtZW50aW5nIGR1bW15IGNvbXByYXJlciBmdW5jdGlvblxuICAvLyBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9LZXlWYWx1ZVBpcGUjZGVzY3JpcHRpb25cbiAga3ZEdW1teUNvbXBhcmVyRm4oKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbiJdfQ==