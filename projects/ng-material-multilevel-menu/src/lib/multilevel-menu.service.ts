 import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';
import {CONSTANT} from './constants';

export class MultilevelMenuService {
  foundLinkObject: MultilevelNodes;
  private expandCollapseStatus: Subject<ExpandCollapseStatusEnum> = new Subject<ExpandCollapseStatusEnum>();
  expandCollapseStatus$: Observable<ExpandCollapseStatusEnum> = this.expandCollapseStatus.asObservable();

  private selectedMenuID: Subject<string> = new Subject<string>();
  selectedMenuID$: Observable<string> = this.selectedMenuID.asObservable();

  private generateId(): string {
    let text = '';
    for (let i = 0; i < 20; i++) {
      text += CONSTANT.POSSIBLE.charAt(Math.floor(Math.random() * CONSTANT.POSSIBLE.length));
    }
    return text;
  }
  addRandomId(nodes: MultilevelNodes[]): void {
    nodes.forEach((node: MultilevelNodes) => {
      node.id = this.generateId();
      if (node.items !== undefined) {
        this.addRandomId(node.items);
      }
    });
  }
  recursiveCheckId(node: MultilevelNodes, nodeId: string): boolean {
    if (node.id === nodeId) {
      return true;
    } else {
      if (node.items !== undefined) {
        return node.items.some((nestedNode: MultilevelNodes) => {
          return this.recursiveCheckId(nestedNode, nodeId);
        });
      }
    }
  }
  private findNodeRecursively({nodes, link, id}: {nodes: MultilevelNodes[], link?: string, id?: string}): void {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const node = nodes[nodeIndex];
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          if (encodeURI(node.link) === link) {
            this.foundLinkObject = node;
          } else if (node.id === id) {
            this.foundLinkObject = node;
          } else {
            if (node.items !== undefined) {
              this.findNodeRecursively({
                nodes: node.items,
                link: link ? link : null,
                id: id ? id : null
              });
            }
          }
        }
      }
    }
  }
  getMatchedObjectByUrl(nodes: MultilevelNodes[], link: string): MultilevelNodes {
    this.findNodeRecursively({nodes, link});
    return this.foundLinkObject;
  }
  getMatchedObjectById(nodes: MultilevelNodes[], id: string): MultilevelNodes {
    this.findNodeRecursively({nodes, id});
    return this.foundLinkObject;
  }
  // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
  // https://angular.io/api/common/KeyValuePipe#description
  kvDummyComparerFn() {
    return 0;
  }
  setMenuExpandCollapseStatus(status: ExpandCollapseStatusEnum): void {
    this.expandCollapseStatus.next(status ? status : ExpandCollapseStatusEnum.neutral);
  }
  selectMenuByID(menuID: string) {
    this.selectedMenuID.next(menuID);
    return this.foundLinkObject;
  }
}
