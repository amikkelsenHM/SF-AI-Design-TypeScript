import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'processing';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  showDot?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  processing: 'badge-processing',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'processing', showDot = true, className = '', children, ...props }, ref) => {
    const classes = ['badge', variantClasses[variant], className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {showDot && <span className="badge-dot" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
