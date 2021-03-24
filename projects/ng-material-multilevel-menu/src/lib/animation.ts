import {animate, group, state, style, transition, trigger} from '@angular/animations';

export const SlideInOut = trigger('SlideInOut', [
    state(
      'in',
      style({height: '*', opacity: 0})),
    transition(':leave', [
      style({height: '*', opacity: 0.2}),
      group([
        animate(200, style({height: 0})),
        animate('200ms ease-out', style({opacity: 0}))
      ])
    ]),
    transition(':enter', [
      style({height: '0', opacity: 0}),
      group([
        animate(200, style({height: '*'})),
        animate('400ms ease-out', style({opacity: 1}))
      ])
    ])
  ]
);

/**
 * Default icon direction state for ltr layout.
 */
export const defaultListItemIconStartState = {startDegree: '90deg'};
export const defaultListItemIconEndState = {endDegree: '0deg'};

/**
 * Default icon direction state for rtl layout.
 */
export const rtlListItemIconState = {startDegree: '-90deg'};

const defaultRotateSpeed = {timings: '200ms'};
/**
 * This animation switches the direction of arrow icon.
 */
export const RotateListItemIcon = trigger('RotateListItemIcon', [
    state('no', style({transform: 'rotate({{startDegree}})'}), {params: defaultListItemIconStartState}),
    state('yes', style({transform: 'rotate({{endDegree}})'}), {params: defaultListItemIconEndState}),

    transition('no <=> yes', animate('{{ timings }}'), {params: defaultRotateSpeed})
  ]
);

/**
 * This animation switches the direction of arrow icon.
 */
export const FlipIcon = trigger('FlipIcon', [
    state('no', style({ transform: 'rotateY(0deg)'})),
    state('yes', style({ transform: 'rotateY(180deg)' })),

    transition('no <=> yes', animate(200))
  ]
);

/**
 * This animation hides the element of the list item, when minimised.
 */
export const FadeInOutListItemElement = trigger('FadeInOutListItemElement', [
  state('true', style({visibility: '*'})),
  state('false', style({visibility: 'hidden'})),
  transition('false <=> true', animate(150))
]);

/**
 * @deprecated This animation should not be used, use RotateListItemIcon instead.
 */
export const ExpandedLTR = trigger('ExpandedLTR', [
  state('no', style({transform: 'rotate(-90deg)'})),
  state('yes', style({transform: 'rotate(0deg)'})),

  transition('no => yes', animate(200)),
  transition('yes => no', animate(200))
]);

/**
 * @deprecated This animation should not be used, use RotateListItemIcon instead.
 */
export const ExpandedRTL = trigger('ExpandedRTL', [
  state('no', style({transform: 'rotate(90deg)'})),
  state('yes', style({transform: 'rotate(0deg)'})),

  transition('no => yes', animate(200)),
  transition('yes => no', animate(200))
]);

/**
 * Default minimum width state for menu.
 */
export const defaultMinimumWidthState = {minimumWidth: '55px'};

/**
 * This animation is responsible to change the width of the menu list.
 */
export const MinimiseMenuList = trigger('MinimiseMenuList',
  [
    state('true', style({width: '*'})),
    state('false', style({width: '{{minimumWidth}}'}), {params: defaultMinimumWidthState}),
    transition('* => *', animate(300))
  ]);
