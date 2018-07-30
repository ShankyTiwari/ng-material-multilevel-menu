import { MultilevelNodes } from './app.model';
export declare class MultilevelMenuService {
    foundLinkObject: MultilevelNodes;
    generateId(): string;
    addRandomId(nodes: MultilevelNodes[]): void;
    recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean;
    recursiveCheckLink(nodes: MultilevelNodes[], link: string): void;
    getMatchedObjectByUrl(node: MultilevelNodes[], link: string): MultilevelNodes;
}
