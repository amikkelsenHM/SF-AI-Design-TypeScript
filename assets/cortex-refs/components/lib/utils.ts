import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

type AdditionalClassGroupIDs = 'typography';

const twMerge = extendTailwindMerge<AdditionalClassGroupIDs>({
  extend: {
    theme: {
      // Custom font sizes
      text: ['xxs', 's', 'm', 'l'],

      font: ['primary', 'secondary'],
    },

    // Custom utility classes
    classGroups: {
      // Typography utilities
      typography: [
        'typography-display-sm',
        'typography-display-lg',
        'typography-heading-lg',
        'typography-heading-md',
        'typography-heading-sm',
        'typography-overline-lg',
        'typography-overline-md',
        'typography-body-lg',
        'typography-body-sm',
        'typography-body-bold-lg',
        'typography-body-bold-sm',
        'typography-cta-lg',
        'typography-cta-sm',
        'typography-link-lg',
        'typography-link-sm',
        'typography-label',
        'typography-label-bold',
        'typography-helper',
        'typography-footnote',
      ],
    },

    // Conflicting groups - these utilities conflict with each other
    conflictingClassGroups: {
      // Typography utilities conflict with font-size and other text utilities
      typography: [
        'font-size',
        'font-weight',
        'text-transform',
        'leading',
        'tracking',
        'font-family',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
