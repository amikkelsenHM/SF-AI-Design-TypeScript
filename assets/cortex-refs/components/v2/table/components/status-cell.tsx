import { BadgeDot } from '@/components/components/ui/badge';
import { ITooltip } from 'models/interfaces/v2/tooltip/ITooltip';
import { getStatusProps } from 'utils/v2/getStatusProps';
import SfTooltip from '../../tooltip/sf-tooltip';

interface StatusCellProps {
  status: string;
  tooltipConfig?: ITooltip;
}

export const StatusCell = ({ status, tooltipConfig }: StatusCellProps) => {
  const { label, variant, state } = getStatusProps(status);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <BadgeDot variant={variant} state={state} />
        {label}
      </div>
      {tooltipConfig && <SfTooltip {...tooltipConfig} />}
    </div>
  );
};
