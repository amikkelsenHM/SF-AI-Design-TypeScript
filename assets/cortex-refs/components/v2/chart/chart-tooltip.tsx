'use client';

import { Typography } from '@/components/components/ui/typography';
import { useMemo } from 'react';
import { TooltipProps } from 'recharts';

const PADDING_ABOVE_BAR = 20;
const MIN_OFFSET = 60;
const CHART_TOP_BUFFER = 10;

export const ChartTooltip = ({
  active,
  payload,
  coordinate,
  viewBox,
}: TooltipProps<any, any>) => {
  const tooltipContent = useMemo(() => {
    const shouldShow =
      active && payload && payload.length && coordinate && viewBox;

    if (!shouldShow) return null;

    const hoveredData = payload[0];

    const chartTop = viewBox.y || 0;
    const chartBottom = chartTop + (viewBox.height || 0);
    const cursorY = coordinate.y || 0;

    const distanceFromBottom = chartBottom - cursorY;

    const idealTooltipOffset = distanceFromBottom + PADDING_ABOVE_BAR;

    const maxOffset = cursorY - chartTop + CHART_TOP_BUFFER;

    const tooltipOffset = Math.max(
      MIN_OFFSET,
      Math.min(idealTooltipOffset, maxOffset)
    );

    return { tooltipOffset, content: hoveredData.value };
  }, [active, payload, coordinate, viewBox]);

  if (!tooltipContent) return null;

  const { content, tooltipOffset } = tooltipContent;

  return (
    <div
      className="relative bg-background-progress text-white px-4 py-3 shadow-lg"
      style={{
        transform: `translate(-67%, -${tooltipOffset}px)`,
        pointerEvents: 'none',
      }}
    >
      <Typography
        variant="heading-sm"
        className="text-white font-medium text-center"
      >
        {content}
      </Typography>

      <div className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-px">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-background-progress" />
      </div>
    </div>
  );
};
