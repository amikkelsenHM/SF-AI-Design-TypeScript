import React from 'react';

export interface GridLine {
  position: number;
  style?: 'solid' | 'dashed' | 'dotted';
}

export interface ChartGridProps {
  horizontalLines?: GridLine[];
  verticalLines?: GridLine[];
  children?: React.ReactNode;
  className?: string;
}

export const ChartGrid: React.FC<ChartGridProps> = ({
  horizontalLines = [],
  verticalLines = [],
  children,
  className = '',
}) => {
  return (
    <div className={`chart-plot-area ${className}`}>
      {horizontalLines.map((line, index) => (
        <div
          key={`h-${index}`}
          className={`chart-grid-line ${line.style === 'dashed' ? 'dashed' : ''}`}
          style={{
            top: `${line.position}%`,
            borderTopStyle: line.style || 'solid',
          }}
        />
      ))}
      {verticalLines.map((line, index) => (
        <div
          key={`v-${index}`}
          className="chart-grid-vertical"
          style={{
            left: `${line.position}%`,
            borderLeftStyle: line.style || 'dotted',
          }}
        />
      ))}
      {children}
    </div>
  );
};

ChartGrid.displayName = 'ChartGrid';

export default ChartGrid;
