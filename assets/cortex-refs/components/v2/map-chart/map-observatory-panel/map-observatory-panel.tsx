import { Typography } from '@/components/components/ui/typography';
import { Unit } from 'models/enums/v2/common';
import { IObservatory } from 'models/interfaces/v2/observatory';
import Link from 'next/link';
import { memo } from 'react';
import { SensorStatus } from '../../pages/sensors/enums';
import { StatusBadge } from '../../status-badge/status-badge';

const DEFAULT_SENSOR_STATUS = SensorStatus.IDLE;

interface MapObservatoryPanelProps {
  observatory: IObservatory;
}

const MapObservatoryPanel = ({
  observatory: {
    name,
    weather: {
      current: { cloudCover, humidity, windSpeed, temperature },
    },
    telescopes,
  },
}: MapObservatoryPanelProps) => {
  const features = [
    // TODO: change when API returns roof status
    { label: 'Temperature', value: `${temperature}${Unit.Celsius}` },
    { label: 'Cloud Cover', value: `${cloudCover}${Unit.Percent}` },
    { label: 'Humidity', value: `${humidity}${Unit.Percent}` },
    { label: 'Wind Speed', value: windSpeed, suffix: Unit.KmPerHour },
  ];

  return (
    <div className="bg-foreground-contrast text-foreground p-6 rounded-tr-md rounded-br-md">
      <Typography variant="label" className="text-medium-orchid">
        Observatory:
      </Typography>
      <Typography variant="heading-md" className="mb-4.5">
        {name}
      </Typography>

      <div className="flex mb-4.5">
        {features.map(({ label, value, suffix }) => (
          <div
            key={label}
            className="flex flex-col gap-y-0.5 text-left px-2 border-r border-border-progress first:pl-0"
          >
            <Typography variant="label">{label}</Typography>
            <Typography variant="body-lg">{value ?? '-'}</Typography>
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
        {telescopes.map(({ id, name, operationStatus }) => (
          <div key={id} className="flex items-center gap-2">
            <Link
              href={`/sensors/${encodeURIComponent(name)}`}
              className="uppercase typography-body-lg text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {name}
            </Link>

            <StatusBadge
              status={
                SensorStatus[
                  operationStatus?.value as keyof typeof SensorStatus
                ] || DEFAULT_SENSOR_STATUS
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MapObservatoryPanel);
