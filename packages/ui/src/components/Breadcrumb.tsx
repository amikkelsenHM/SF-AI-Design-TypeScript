import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="breadcrumb-link breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <a
                  href={item.href || '#'}
                  className="breadcrumb-link"
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  {item.label}
                </a>
                <span className="breadcrumb-separator" aria-hidden="true" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
