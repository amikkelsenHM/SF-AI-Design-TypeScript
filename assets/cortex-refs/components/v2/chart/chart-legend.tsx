'use client';

import { Typography } from '@/components/components/ui/typography';
import { memo } from 'react';

export interface LegendItem {
  color: string;
  label: string;
}

interface SFChartLegendProps {
  items: LegendItem[];
  textColor?: string;
  marginTop?: number;
  paddingLeft?: number;
  fontSize?: number;
}

const SFChartLegend = ({ items = [] }: SFChartLegendProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul
      className="flex items-center mt-1 gap-3 text-foreground"
      aria-label="Chart legend"
    >
      {items.map((item, index) => (
        <li key={`legend-item-${index}`} className="flex items-center gap-2">
          <div
            className="size-3 rounded-full shrink-0"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <Typography variant="body-sm" className="whitespace-nowrap">
            {item.label}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default memo(SFChartLegend);
