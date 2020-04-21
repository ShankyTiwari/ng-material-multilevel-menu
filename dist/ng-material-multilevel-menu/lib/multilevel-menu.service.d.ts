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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsibXVsdGlsZXZlbC1tZW51LnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcbiAgICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcbiAgICBnZW5lcmF0ZUlkKCk6IHN0cmluZztcbiAgICBhZGRSYW5kb21JZChub2RlczogTXVsdGlsZXZlbE5vZGVzW10pOiB2b2lkO1xuICAgIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW47XG4gICAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZDtcbiAgICBnZXRNYXRjaGVkT2JqZWN0QnlVcmwobm9kZTogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IE11bHRpbGV2ZWxOb2RlcztcbiAgICBrdkR1bW15Q29tcGFyZXJGbigpOiBudW1iZXI7XG59XG4iXX0=