import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'display-sm': 'typography-display-sm',
      'display-lg': 'typography-display-lg',
      'heading-lg': 'typography-heading-lg',
      'heading-md': 'typography-heading-md',
      'heading-sm': 'typography-heading-sm',
      'overline-lg': 'typography-overline-lg',
      'overline-md': 'typography-overline-md',
      'body-lg': 'typography-body-lg',
      'body-sm': 'typography-body-sm',
      'body-bold-lg': 'typography-body-bold-lg',
      'body-bold-sm': 'typography-body-bold-sm',
      'cta-lg': 'typography-cta-lg',
      'cta-sm': 'typography-cta-sm',
      'link-lg': 'typography-link-lg',
      'link-sm': 'typography-link-sm',
      label: 'typography-label',
      'label-bold': 'typography-label-bold',
      helper: 'typography-helper',
      footnote: 'typography-footnote',
    },
  },
  defaultVariants: {
    variant: 'body-sm',
  },
});

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    component?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
  };

export const Typography = ({
  component = 'div',
  variant = 'body-sm',
  className,
  children,
  ...props
}: TypographyProps) => {
  const Comp = component as React.ElementType;

  return (
    <Comp className={typographyVariants({ variant, className })} {...props}>
      {children}
    </Comp>
  );
};
