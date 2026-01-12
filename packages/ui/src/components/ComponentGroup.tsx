import React from 'react';

export interface ComponentGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactNode;
}

export const ComponentGroup = React.forwardRef<HTMLDivElement, ComponentGroupProps>(
  ({ label, className = '', children, ...props }, ref) => {
    const classes = ['component-group', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {label && <span className="component-label">{label}</span>}
        {children}
      </div>
    );
  }
);

ComponentGroup.displayName = 'ComponentGroup';

export interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactNode;
}

export const ComponentWrapper = React.forwardRef<HTMLDivElement, ComponentWrapperProps>(
  ({ label, className = '', children, ...props }, ref) => {
    const classes = ['component-wrapper', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {label && <span className="component-label">{label}</span>}
        {children}
      </div>
    );
  }
);

ComponentWrapper.displayName = 'ComponentWrapper';

export default ComponentGroup;
