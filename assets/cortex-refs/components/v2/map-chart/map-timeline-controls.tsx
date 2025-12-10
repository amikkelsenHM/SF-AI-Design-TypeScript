'use client';

import { Button } from '@/components/components/ui/button';
import ModeToggleButton from '@/components/components/ui/mode-toggle-button';
import { Slider } from '@/components/components/ui/slider';
import { Typography } from '@/components/components/ui/typography';
import { cn } from '@/components/lib/utils';
import { formatFullDate, formatShortDate } from '@/utils/v2/dates';
import {
  EarthIcon,
  MapIcon,
  OrbitIcon,
  PauseIcon,
  PlayIcon,
  SatelliteIcon,
} from 'lucide-react';
import { MapMode, Mode } from 'models/interfaces/v2/am-chart';
import { memo } from 'react';

export interface TimeWindow {
  start: number;
  end: number;
}

export interface MapTimelineControlsProps {
  currentDate: Date | null;
  timeWindow: TimeWindow | null;
  sliderValue: number;
  onSliderChange: (pct: number) => void;

  playing: boolean;
  onTogglePlay: () => void;

  showUtc: boolean;
  onToggleUtc: (next: boolean) => void;

  mode: MapMode;
  onModeChange: (mode: MapMode) => void;

  className?: string;
  disabled?: boolean;

  followTarget: boolean;
  onSetFollowTarget: (next: boolean) => void;
}

const MapTimelineControls = memo(function MapTimelineControls({
  currentDate,
  timeWindow,
  sliderValue,
  onSliderChange,
  playing,
  onTogglePlay,
  showUtc,
  onToggleUtc,
  mode,
  onModeChange,
  className,
  disabled,
  followTarget,
  onSetFollowTarget,
}: MapTimelineControlsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 relative bottom-13 z-10',
        className
      )}
      role="group"
    >
      <div className="flex items-center gap-2 rounded-lg bg-background/80 backdrop-blur px-3 py-2 shadow">
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={onTogglePlay}
          disabled={disabled}
          aria-pressed={playing}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>

        <div className="w-[300px]">
          <Slider
            value={[sliderValue]}
            max={100}
            min={0}
            step={1}
            onValueChange={([v]) => onSliderChange(v)}
            disabled={disabled}
            showTooltip
            formatTooltip={() =>
              currentDate ? formatFullDate(currentDate, showUtc) : '—'
            }
          />

          {timeWindow && (
            <div className="flex justify-between text-xs opacity-70 mt-1 tabular-nums select-none">
              <Typography
                onClick={() => onToggleUtc(!showUtc)}
                className="cursor-pointer"
              >
                {formatShortDate(new Date(timeWindow.start), showUtc)}
              </Typography>
              <Typography
                onClick={() => onToggleUtc(!showUtc)}
                className="cursor-pointer"
              >
                {formatShortDate(new Date(timeWindow.end), showUtc)}
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1 rounded-lg absolute right-3 bg-background/80 backdrop-blur px-3 py-2 shadow">
        <ModeToggleButton
          isActive={mode === Mode.GLOBE}
          onToggle={() =>
            onModeChange(mode === Mode.MAP ? Mode.GLOBE : Mode.MAP)
          }
          activeContent={<EarthIcon className="size-6" />}
          inactiveContent={<MapIcon className="size-6" />}
          activeLabel="Globe view"
          inactiveLabel="Map view"
          activeTooltip="Globe View"
          inactiveTooltip="Map View"
          size="icon-sm"
          variant="secondary"
          disabled={disabled}
        />

        {mode === Mode.GLOBE && (
          <ModeToggleButton
            isActive={followTarget}
            onToggle={() => onSetFollowTarget(!followTarget)}
            activeContent={<SatelliteIcon className="size-5" />}
            inactiveContent={<OrbitIcon className="size-5" />}
            activeLabel="Lock to target"
            inactiveLabel="Unlock"
            activeTooltip="Follow Object"
            inactiveTooltip="Free View"
            size="icon-sm"
            variant="secondary"
            disabled={disabled || mode !== Mode.GLOBE}
          />
        )}
      </div>
    </div>
  );
});

export default MapTimelineControls;
