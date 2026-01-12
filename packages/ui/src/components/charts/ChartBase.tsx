import React from 'react';

export interface ChartBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const ChartBase = React.forwardRef<HTMLDivElement, ChartBaseProps>(
  ({ title, actions, className = '', children, ...props }, ref) => {
    const classes = ['chart-base', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {(title || actions) && (
          <div className="chart-header">
            {title && <div className="chart-header-title">{title}</div>}
            {actions && <div className="chart-header-actions">{actions}</div>}
          </div>
        )}
        <div className="chart-layout-container">{children}</div>
      </div>
    );
  }
);

ChartBase.displayName = 'ChartBase';

export default ChartBase;
