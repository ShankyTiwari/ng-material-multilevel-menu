import { Observable } from 'rxjs';
import { MultilevelNode, ExpandCollapseStatusEnum } from './app.model';
export declare class MultilevelMenuService {
    foundLinkObject: MultilevelNode;
    private expandCollapseStatus;
    expandCollapseStatus$: Observable<ExpandCollapseStatusEnum>;
    private selectedMenuID;
    selectedMenuID$: Observable<string>;
    private generateId;
    addRandomId(nodes: MultilevelNode[]): void;
    recursiveCheckId(node: MultilevelNode, nodeId: string): boolean;
    private findNodeRecursively;
    getMatchedObjectByUrl(nodes: MultilevelNode[], link: string): MultilevelNode;
    getMatchedObjectById(nodes: MultilevelNode[], id: string): MultilevelNode;
    kvDummyComparerFn(): number;
    setMenuExpandCollapseStatus(status: ExpandCollapseStatusEnum): void;
    selectMenuByID(menuID: string): MultilevelNode;
}
