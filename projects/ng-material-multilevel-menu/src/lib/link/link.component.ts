import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() isLinkExternal: boolean;
  @Input() link: string;

  constructor() { }

  ngOnInit(): void {
  }

}
