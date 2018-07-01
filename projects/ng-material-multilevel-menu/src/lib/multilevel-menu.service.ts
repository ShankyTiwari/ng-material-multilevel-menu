import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

import { MultilevelNodes } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class MultilevelMenuService {
  isLastItemClikedStorage = new BehaviorSubject(false);
  isLastItemCliked: Observable<boolean> = this.isLastItemClikedStorage.asObservable();
  generateId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  addRandomId(nodes: MultilevelNodes[]): void {
    nodes.forEach((node: MultilevelNodes, index) => {
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
  updateClickedItem(isCliked: boolean) {
    this.isLastItemClikedStorage.next(isCliked);
  }
}
