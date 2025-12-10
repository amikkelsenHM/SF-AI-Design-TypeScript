'use client';

import { COLORS } from 'styles/colors';

export interface RechartsFunctionProps {
  yAxisMap: Record<string, { scale: (val: number) => number }>;
  offset: {
    left: number;
    width: number;
    top: number;
    height: number;
  };
}

export function renderExtendedXAxisLine(
  props: RechartsFunctionProps,
  yValue = 0,
  stroke = COLORS.BACKGROUND_PROGRESS,
  strokeWidth = 1,
  extendLeft = 100,
  extendRight = 0
) {
  const { yAxisMap, offset } = props as RechartsFunctionProps;
  const yAxis = Object.values(yAxisMap)[0];
  const y = yAxis?.scale(yValue) ?? 0;

  return (
    <line
      x1={offset.left - extendLeft}
      y1={y}
      x2={offset.left + offset.width + extendRight}
      y2={y}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
