import { animate, style, transition, trigger } from '@angular/animations';

export const fade = trigger(
  'fade',
  [
    transition(
      ':enter',   // elemento entra no DOM
      [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1}))
      ]
    ),
    transition(
      ':leave',   // elemento sai no DOM
      [
        animate(100, style({ opacity: 0}))
      ]
    )
  ]
);
