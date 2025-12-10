import { ReactNode, useCallback, useMemo } from 'react';

const STROKE_WIDTH = 1;
const STROKE_RADIUS = 10;
const RECT_SIDES = 4;
const RECT_CORNERS = 4;
const CORNER_EDGE_SEGMENTS = 2; // Each corner replaces 2 straight edge segments with an arc

interface RectangleProgressProps {
  currentValue: number;
  maxValue: number;
  backgroundValue?: number;
  size: number;
  sideOffset: number;
  children?: ReactNode;
  colors: {
    foreground: string;
    background: string;
    max: string;
  };
}

const RectangleProgress = ({
  currentValue,
  maxValue,
  backgroundValue,
  colors,
  sideOffset,
  size,
  children,
}: RectangleProgressProps) => {
  const commonRectProps = useMemo(() => {
    const dimension = size - (sideOffset * 2 + STROKE_WIDTH / 2);

    // start at the top center side of the rectangle
    const strokeDashoffset = -dimension / 2;

    return {
      x: sideOffset,
      y: sideOffset,
      width: dimension,
      height: dimension,
      rx: STROKE_RADIUS,
      fill: 'none',
      strokeWidth: STROKE_WIDTH,
      strokeDashoffset,
    };
  }, [sideOffset, size]);

  const circumference = useMemo(
    () =>
      RECT_SIDES * commonRectProps.width -
      RECT_CORNERS * CORNER_EDGE_SEGMENTS * STROKE_RADIUS +
      2 * Math.PI * STROKE_RADIUS,
    [commonRectProps.width]
  );

  const calculateStrokeDasharray = useCallback(
    (value: number): string => {
      const clampedValue = Math.max(0, Math.min(value, maxValue));
      const portion = clampedValue / maxValue;
      const strokeLength = portion * circumference;
      const gapLength = circumference - strokeLength;
      return `${strokeLength} ${gapLength}`;
    },
    [maxValue, circumference]
  );

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <rect
          {...commonRectProps}
          stroke={colors.max}
          strokeDasharray={calculateStrokeDasharray(maxValue)}
        />

        {backgroundValue && (
          <rect
            {...commonRectProps}
            stroke={colors.background}
            strokeDasharray={calculateStrokeDasharray(backgroundValue)}
          />
        )}

        <rect
          {...commonRectProps}
          stroke={colors.foreground}
          strokeDasharray={calculateStrokeDasharray(currentValue)}
        />
      </svg>

      <div className="z-10 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default RectangleProgress;
