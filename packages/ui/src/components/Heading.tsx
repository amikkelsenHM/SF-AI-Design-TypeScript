import React from 'react';

export type HeadingVariant =
  | 'display-large'
  | 'heading-large'
  | 'heading-medium'
  | 'overline-large'
  | 'overline-medium';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  children: React.ReactNode;
}

const variantClasses: Record<HeadingVariant, string> = {
  'display-large': 'text-display-large',
  'heading-large': 'text-heading-large',
  'heading-medium': 'text-heading-medium',
  'overline-large': 'text-overline-large',
  'overline-medium': 'text-overline-medium',
};

const defaultElements: Record<HeadingVariant, HeadingProps['as']> = {
  'display-large': 'h1',
  'heading-large': 'h2',
  'heading-medium': 'h3',
  'overline-large': 'h4',
  'overline-medium': 'h5',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ variant = 'heading-medium', as, className = '', children, ...props }, ref) => {
    const Component = as || defaultElements[variant] || 'h3';
    const classes = [variantClasses[variant], className].filter(Boolean).join(' ');

    return (
      <Component ref={ref as any} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
