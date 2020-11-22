import { Observable, Subject } from 'rxjs';
import { MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';
export declare class MultilevelMenuService {
    foundLinkObject: MultilevelNodes;
    expandCollapseStatus: Subject<ExpandCollapseStatusEnum>;
    expandCollapseStatus$: Observable<ExpandCollapseStatusEnum>;
    selectedMenuID: Subject<string>;
    selectedMenuID$: Observable<string>;
    private generateId;
    addRandomId(nodes: MultilevelNodes[]): void;
    recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean;
    private findNodeRecursively;
    getMatchedObjectByUrl(nodes: MultilevelNodes[], link: string): MultilevelNodes;
    getMatchedObjectById(nodes: MultilevelNodes[], id: string): MultilevelNodes;
    kvDummyComparerFn(): number;
    setMenuExapandCollpaseStatus(status: ExpandCollapseStatusEnum): void;
    selectMenuByID(menuID: string): MultilevelNodes;
}
