import React from 'react';

export interface ChartYAxisProps {
  label?: string;
  values: (string | number)[];
  className?: string;
}

export const ChartYAxis: React.FC<ChartYAxisProps> = ({ label, values, className = '' }) => {
  return (
    <div className={`chart-y-label-container ${className}`}>
      {label && <span className="chart-axis-label y-axis">{label}</span>}
      <div className="chart-y-axis" style={{ justifyContent: 'space-between' }}>
        {values.map((value, index) => (
          <span key={index}>{value}</span>
        ))}
      </div>
    </div>
  );
};

ChartYAxis.displayName = 'ChartYAxis';

export interface ChartXAxisProps {
  label?: string;
  values: (string | number)[];
  className?: string;
}

export const ChartXAxis: React.FC<ChartXAxisProps> = ({ label, values, className = '' }) => {
  const getLeftPosition = (index: number, total: number): string => {
    if (total <= 1) return '0%';
    return `${(index / (total - 1)) * 100}%`;
  };

  return (
    <div className={`chart-x-axis-container ${className}`}>
      <div className="chart-x-axis">
        {values.map((value, index) => (
          <span key={index} style={{ left: getLeftPosition(index, values.length) }}>
            {value}
          </span>
        ))}
      </div>
      {label && <div className="chart-axis-label x-axis">{label}</div>}
    </div>
  );
};

ChartXAxis.displayName = 'ChartXAxis';

export default { ChartYAxis, ChartXAxis };
