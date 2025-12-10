import { Skeleton } from '@/components/components/ui/skeleton';
import { Typography } from '@/components/components/ui/typography';
import SensorsMap from '@/components/v2/sensors/sensors-map';

interface NetworkMapSectionProps {
  isLoading?: boolean;
}

const NetworkMapSection = ({ isLoading = false }: NetworkMapSectionProps) => {
  return (
    <div className="grid gap-y-3 h-full content-start auto-rows-[auto_1fr]">
      <Typography variant="overline-md" className="text-foreground">
        Network map
      </Typography>

      {!isLoading ? <SensorsMap /> : <Skeleton className="h-[500px]" />}
    </div>
  );
};

export default NetworkMapSection;
