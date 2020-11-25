import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const SlideInOut = trigger('SlideInOut', [
    state(
        'in', 
        style({ height: '*', opacity: 0 })),
        transition(':leave', [
            style({ height: '*', opacity: 0.2 }),
            group([
            animate(200, style({ height: 0 })),
            animate('200ms ease-out', style({ opacity: 0 }))
            ])
        ]),
        transition(':enter', [
            style({ height: '0', opacity: 0 }),
            group([
            animate(200, style({ height: '*' })),
            animate('400ms ease-out', style({ opacity: 1 }))
            ])
        ])
    ]
)

export const ExpandedLTR = trigger('ExpandedLTR', [
    state('no', style({ transform: 'rotate(-90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),

    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
])

export const ExpandedRTL = trigger('ExpandedRTL', [
    state('no', style({ transform: 'rotate(90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),

    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
])
