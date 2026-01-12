import React from 'react';

export type TextVariant =
  | 'body-large'
  | 'body-small'
  | 'body-bold-large'
  | 'body-bold-small'
  | 'cta-large'
  | 'cta-small'
  | 'link-large'
  | 'link-small'
  | 'footnote'
  | 'helper'
  | 'label'
  | 'label-bold';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  as?: 'span' | 'p' | 'div' | 'label';
  children: React.ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  'body-large': 'text-body-large',
  'body-small': 'text-body-small',
  'body-bold-large': 'text-body-bold-large',
  'body-bold-small': 'text-body-bold-small',
  'cta-large': 'text-cta-large',
  'cta-small': 'text-cta-small',
  'link-large': 'text-link-large',
  'link-small': 'text-link-small',
  'footnote': 'text-footnote',
  'helper': 'text-helper',
  'label': 'text-label',
  'label-bold': 'text-label-bold',
};

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ variant = 'body-small', as: Component = 'span', className = '', children, ...props }, ref) => {
    const classes = [variantClasses[variant], className].filter(Boolean).join(' ');

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export default Text;
