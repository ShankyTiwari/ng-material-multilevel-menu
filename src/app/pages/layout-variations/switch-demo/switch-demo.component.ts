import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-switch-demo',
    templateUrl: './switch-demo.component.html',
    styleUrls: ['./switch-demo.component.css'],
})
export class SwitchDemoComponent {
    @Input() next: string;
    @Input() nextLabel: string = 'Next Demo';
    @Input() previous: string;
    @Input() previousLabel: string = 'Previous Demo';
}
