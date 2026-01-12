import React from 'react';

export interface LegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LegendItem[];
}

export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ items, className = '', style, ...props }, ref) => {
    const classes = ['chart-legend', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={{ justifyContent: 'flex-start', marginTop: '24px', paddingLeft: '70px', ...style }}
        {...props}
      >
        {items.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
);

ChartLegend.displayName = 'ChartLegend';

export default ChartLegend;
