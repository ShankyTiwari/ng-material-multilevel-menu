import { MultilevelNodes } from './app.model';
import * as ɵngcc0 from '@angular/core';
export declare class MultilevelMenuService {
    foundLinkObject: MultilevelNodes;
    generateId(): string;
    addRandomId(nodes: MultilevelNodes[]): void;
    recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean;
    recursiveCheckLink(nodes: MultilevelNodes[], link: string): void;
    getMatchedObjectByUrl(node: MultilevelNodes[], link: string): MultilevelNodes;
    kvDummyComparerFn(): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MultilevelMenuService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xyXG4gICAgZm91bmRMaW5rT2JqZWN0OiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgICBnZW5lcmF0ZUlkKCk6IHN0cmluZztcclxuICAgIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQ7XHJcbiAgICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZDtcclxuICAgIGdldE1hdGNoZWRPYmplY3RCeVVybChub2RlOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gICAga3ZEdW1teUNvbXBhcmVyRm4oKTogbnVtYmVyO1xyXG59XHJcbiJdfQ==