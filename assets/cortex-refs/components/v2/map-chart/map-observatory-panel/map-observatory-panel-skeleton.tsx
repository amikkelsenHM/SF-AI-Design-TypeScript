import { Skeleton } from '@/components/components/ui/skeleton';
import { Typography } from '@/components/components/ui/typography';
import { Unit } from 'models/enums/v2/common';

const features = [
  { label: 'Temperature' },
  { label: 'Cloud Cover' },
  { label: 'Humidity' },
  { label: 'Wind Speed', suffix: Unit.KmPerHour },
];

const DEFAULT_SENSORS_COUNT = 3;

const MapObservatoryPanelSkeleton = () => {
  return (
    <div className="bg-foreground-contrast text-foreground p-6 rounded-tr-md rounded-br-md">
      <Typography variant="label" className="text-medium-orchid">
        Observatory:
      </Typography>
      <Skeleton className="mb-4.5 w-40 h-8" />

      <div className="flex mb-4.5">
        {features.map(({ label, suffix }) => (
          <div
            key={label}
            className="flex flex-col gap-y-0.5 text-left px-2 border-r border-border-progress first:pl-0"
          >
            <Typography variant="label">{label}</Typography>
            <Skeleton className="w-12.5 h-6" />
            {suffix && (
              <Typography
                variant="footnote"
                className="text-medium-orchid uppercase"
              >
                {suffix}
              </Typography>
            )}
          </div>
        ))}
      </div>

      <Typography variant="label" className="text-medium-orchid mb-2">
        Sensors:
      </Typography>
      <div className="flex flex-col gap-2">
        {Array.from({ length: DEFAULT_SENSORS_COUNT }).map((_, index) => (
          <Skeleton key={index} className="w-40 h-6" />
        ))}
      </div>
    </div>
  );
};

export default MapObservatoryPanelSkeleton;
