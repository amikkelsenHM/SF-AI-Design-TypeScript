import { Badge } from '@/components/components/ui/badge';
import { Typography } from '@/components/components/ui/typography';
import { FC } from 'react';

const SensorDetails: FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Typography>Observational Status</Typography>
        {/* TODO: comment from Doran: Remove the i icon next to observation status, We may need it later but have no copy 
         <InfoIcon /> */}
      </div>
      <Badge state="success">Available</Badge>
    </div>
  );
};

export default SensorDetails;
