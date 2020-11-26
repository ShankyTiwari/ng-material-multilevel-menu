import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-six',
  templateUrl: './demo-six.component.html',
  styleUrls: ['./demo-six.component.css']
})
export class DemoSixComponent implements OnInit {
  links = [{
    name: 'Basic Menu (RLT Demo)',
    link: 'version-one'
  },{
    name: 'Version Two',
    link: 'version-two'
  },{
    name: 'Version Three',
    link: 'version-three'
  }];
  activeLink = this.links[0].link;
  background: ThemePalette = undefined;

  showDemo(link: string): void {
    this.activeLink = link;
    this.router.navigate([`/pages/layout-variations/demo-six/${link}`])
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
