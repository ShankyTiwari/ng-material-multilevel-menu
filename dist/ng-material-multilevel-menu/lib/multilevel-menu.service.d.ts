import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { MultilevelNodes } from './app.model';
export declare class MultilevelMenuService {
    isLastItemClikedStorage: BehaviorSubject<boolean>;
    isLastItemCliked: Observable<boolean>;
    generateId(): string;
    addRandomId(nodes: MultilevelNodes[]): void;
    recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean;
    updateClickedItem(isCliked: boolean): void;
}
