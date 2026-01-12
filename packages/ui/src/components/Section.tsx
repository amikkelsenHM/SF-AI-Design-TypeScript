import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, title, className = '', children, ...props }, ref) => {
    const classes = ['section', className].filter(Boolean).join(' ');

    return (
      <section ref={ref} id={id} className={classes} {...props}>
        {title && <h2>{title}</h2>}
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
