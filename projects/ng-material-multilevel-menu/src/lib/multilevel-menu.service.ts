import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class MultilevelMenuService {
  foundLinkObject: MultilevelNodes;
  expandCollapseStatus: Subject<any> = new Subject<any>();
  expandCollapseStatus$: Observable<any> = this.expandCollapseStatus.asObservable();

  private generateId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
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
  private recursiveCheckLink(nodes: MultilevelNodes[], link: string): void {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const node = nodes[nodeIndex];
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          if (encodeURI(node.link) === link) {
            this.foundLinkObject = node;
          } else {
            if (node.items !== undefined) {
              this.recursiveCheckLink(node.items, link);
            }
          }
        }
      }
    }
  }
  getMatchedObjectByUrl(node: MultilevelNodes[], link: string): MultilevelNodes {
    this.recursiveCheckLink(node, link);
    return this.foundLinkObject;
  }
  // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
  // https://angular.io/api/common/KeyValuePipe#description
  kvDummyComparerFn() {
    return 0;
  }
  setMenuExapandCollpaseStatus(status: ExpandCollapseStatusEnum): void {
    this.expandCollapseStatus.next(status ? status : ExpandCollapseStatusEnum.neutral);
  }
}
