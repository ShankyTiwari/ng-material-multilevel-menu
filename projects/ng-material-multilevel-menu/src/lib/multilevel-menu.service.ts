import { Injectable } from '@angular/core';
import { MultilevelNodes } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class MultilevelMenuService {
  foundLinkObject: MultilevelNodes;
  generateId(): string {
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
  recursiveCheckLink(nodes: MultilevelNodes[], link: string): void {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const node = nodes[nodeIndex];
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          if (node.link === link) {
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
}
