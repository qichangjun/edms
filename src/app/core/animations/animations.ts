import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';
// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('slideInDownAnimation', [
    state('*',style({
      transition : '0.8s ease-out',
      height: '100%',
      float: 'right',width: 'calc(100% - 70px)',background: '#f3f3f3'
    })),
    transition(':enter', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate('0.6s ease-in',style({  transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      style({
        transform: 'translateX(0)'
      }),
      animate('0.8s ease-out', style({
        transform: 'translateX(100%)'
      }))
    ])
  ]);
export const slidFromBottomAnimation: AnimationEntryMetadata =
  trigger('routeAnimation',[
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
    ])
  ]);
