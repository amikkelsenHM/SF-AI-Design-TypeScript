'use client';

import { Button } from '@/components/components/ui/button';
import ModeToggleButton from '@/components/components/ui/mode-toggle-button';
import { Skeleton } from '@/components/components/ui/skeleton';
import { cn } from '@/components/lib/utils';
import { useTimelinePlayback } from '@/hooks/useTimelinePlayback';
import * as am5 from '@amcharts/amcharts5';
import { useMap } from 'hooks/useMap';
import { useMapObservatory } from 'hooks/useMapObservatory';
import { useTooltipNavigation } from 'hooks/useTooltipNavigation';
import { EarthIcon, MapIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { MapMode, Mode } from 'models/interfaces/v2/am-chart';
import { IObservatory } from 'models/interfaces/v2/observatory';
import { memo, useRef, useState } from 'react';
import { CampaignTarget } from '../pages/object-tracking/types';
import { MAP_CONFIG } from './constants/map-constants';
import MapObservatoryPanel from './map-observatory-panel/map-observatory-panel';
import MapObservatoryPanelSkeleton from './map-observatory-panel/map-observatory-panel-skeleton';
import MapTimelineControls from './map-timeline-controls';

// License key setup
if (process.env.AM_CHARTS_LICENSE_KEY) {
  am5.addLicense(process.env.AM_CHARTS_LICENSE_KEY);
}

interface ParentProps {
  initialMode?: MapMode;
  observatories: IObservatory[];
  object?: CampaignTarget;
  height?: number | string;
}

const Map = ({
  initialMode = Mode.MAP,
  observatories,
  object,
  height = 500,
}: ParentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<MapMode>(initialMode);
  const [showUtc, setShowUtc] = useState(true);
  const [followTarget, setFollowTarget] = useState(false);

  const { selectedObservatory, setObservatoryId } =
    useMapObservatory(observatories);

  const { isLoading, handleMapZoom, setTimelineProgress, getTimeWindow } =
    useMap({
      mapContainerRef,
      globeContainerRef,
      mode,
      observatories,
      object,
      selectedObservatory,
      setObservatoryId,
      followTarget,
    });

  const {
    sliderVal,
    setSliderVal,
    timeWindow,
    currentDate,
    playing,
    togglePlay,
  } = useTimelinePlayback(getTimeWindow, setTimelineProgress, object);

  useTooltipNavigation();

  return (
    <div className={!object ? 'grid grid-cols-[1fr_345px]' : 'w-full'}>
      <div
        className={cn(
          'w-full h-full bg-foreground-subtle rounded-tl-md rounded-bl-md relative'
        )}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <div
          ref={mapContainerRef}
          style={{
            width: '100%',
            height: '100%',
            display: mode === Mode.MAP ? 'block' : 'none',
          }}
        />
        <div
          ref={globeContainerRef}
          style={{
            width: '100%',
            height: '100%',
            display: mode === Mode.GLOBE ? 'block' : 'none',
          }}
        />

        {!object && (
          <div className="absolute bottom-0 right-0 p-4 z-10">
            <div className="flex items-center gap-2 rounded-lg bg-background/80 backdrop-blur px-3 py-2 shadow">
              <ModeToggleButton
                isActive={mode === Mode.GLOBE}
                onToggle={() =>
                  setMode((prev) => (prev === Mode.MAP ? Mode.GLOBE : Mode.MAP))
                }
                activeContent={<EarthIcon className="size-6" />}
                inactiveContent={<MapIcon className="size-6" />}
                activeLabel="Globe view"
                inactiveLabel="Map view"
                activeTooltip="Globe view"
                inactiveTooltip="Map view"
                size="icon-sm"
                variant="secondary"
              />

              {mode === Mode.MAP && (
                <>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    onClick={() => handleMapZoom(MAP_CONFIG.ZOOM_OUT_STEP)}
                  >
                    <MinusIcon />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    onClick={() => handleMapZoom(MAP_CONFIG.ZOOM_IN_STEP)}
                  >
                    <PlusIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {object && (
          <MapTimelineControls
            currentDate={currentDate}
            timeWindow={timeWindow}
            sliderValue={sliderVal}
            onSliderChange={(v) => {
              setSliderVal(v);
              setTimelineProgress(v);
            }}
            playing={playing}
            onTogglePlay={togglePlay}
            showUtc={showUtc}
            onToggleUtc={(next) => setShowUtc(next)}
            mode={mode}
            onModeChange={(nextMode) => {
              setMode(nextMode);
              if (nextMode === Mode.GLOBE && object) {
                setFollowTarget(true);
                setTimelineProgress(sliderVal);
              }
            }}
            disabled={isLoading}
            followTarget={followTarget}
            onSetFollowTarget={(next) => {
              setFollowTarget(next);
              if (next && mode === Mode.GLOBE) {
                setTimelineProgress(sliderVal);
              }
            }}
          />
        )}

        {isLoading && (
          <Skeleton className="absolute top-0 left-0 w-full h-full rounded-tr-none rounded-br-none" />
        )}
      </div>

      {!object && (
        <>
          {selectedObservatory && !isLoading ? (
            <MapObservatoryPanel observatory={selectedObservatory} />
          ) : (
            <MapObservatoryPanelSkeleton />
          )}
        </>
      )}
    </div>
  );
};

export default memo(Map);
