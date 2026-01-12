import React from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  return (
    <div className={`tooltip-container ${className}`}>
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
