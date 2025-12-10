import RectangleProgress from '@/components/components/ui/rectangle-progress';
import { Separator } from '@/components/components/ui/separator';
import { Typography } from '@/components/components/ui/typography';
import {
  BORDER_SIDE_OFFSET,
  CIRCLE_COLORS,
  RECT_SIZE,
} from '@/components/v2/pages/object-tracking/new/form-preview/sections/subscription-usage/utils';

type Props = {
  current: number;
  max: number;
  background?: number;
};

export default function UsageGauge({
  current,
  max,
  background = current,
}: Props) {
  return (
    <div className="size-[147px] rounded-lg bg-foreground-subtle">
      <RectangleProgress
        currentValue={current}
        maxValue={max}
        backgroundValue={background}
        colors={CIRCLE_COLORS}
        size={RECT_SIZE}
        sideOffset={BORDER_SIDE_OFFSET}
      >
        <div className="flex flex-col gap-1 text-foreground items-center">
          <Typography variant="heading-md">{current}</Typography>
          <Separator className="bg-border-light w-16!" />
          <Typography variant="heading-md">{max}</Typography>
        </div>
      </RectangleProgress>
    </div>
  );
}
