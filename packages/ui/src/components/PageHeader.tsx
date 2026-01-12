import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navItems?: NavItem[];
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ logo, logoHref = '#', navItems = [], className = '', children, ...props }, ref) => {
    const classes = ['showcase-header', className].filter(Boolean).join(' ');

    return (
      <header ref={ref} className={classes} {...props}>
        <div className="logo-container">
          <a href={logoHref} title="Back to top">
            {logo}
          </a>
        </div>
        {navItems.length > 0 && (
          <nav className="showcase-nav">
            {navItems.map((item, index) => (
              <a key={index} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
        {children}
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
