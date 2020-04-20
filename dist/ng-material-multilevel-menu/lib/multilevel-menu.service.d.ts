import { MultilevelNodes } from './app.model';
import * as i0 from "@angular/core";
export declare class MultilevelMenuService {
    foundLinkObject: MultilevelNodes;
    generateId(): string;
    addRandomId(nodes: MultilevelNodes[]): void;
    recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean;
    recursiveCheckLink(nodes: MultilevelNodes[], link: string): void;
    getMatchedObjectByUrl(node: MultilevelNodes[], link: string): MultilevelNodes;
    kvDummyComparerFn(): number;
    static ɵfac: i0.ɵɵFactoryDef<MultilevelMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDef<MultilevelMenuService>;
}
