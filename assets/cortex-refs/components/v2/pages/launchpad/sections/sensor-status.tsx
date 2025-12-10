import { Typography } from '@/components/components/ui/typography';
import SensorsTable from '@/components/v2/sensors/sensors-table';
import { usePermission } from 'providers/permission-provider';
import { SensorTableView } from '../../sensors/enums';

interface SensorStatusSectionProps {
  isLoading?: boolean;
}

const SensorStatusSection = ({
  isLoading = false,
}: SensorStatusSectionProps) => {
  const { isAdmin } = usePermission();

  return (
    <div className="grid gap-y-3">
      <Typography variant="overline-md" className="text-foreground">
        Sensor status
      </Typography>

      <SensorsTable
        isLoading={isLoading}
        view={isAdmin ? SensorTableView.Detailed : SensorTableView.Summary}
        features={{ sorting: true }}
      />
    </div>
  );
};

export default SensorStatusSection;
