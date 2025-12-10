import { Label } from '@/components/components/ui/label';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { EditObjectTrackingFormData } from '../../types';

const OPTIONS = [
  { label: 'High', value: 'High' },
  { label: 'Low', value: 'Low' },
];

interface RevisitRateSelectProps {
  isLoading: boolean;
}
// TODO: OUT_OF_SCOPE
const RevisitRateSelect = ({ isLoading }: RevisitRateSelectProps) => {
  const { control } = useFormContext<EditObjectTrackingFormData>();

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="revisitRate"
        className="typography-body-sm text-foreground"
      >
        Revisit Rate
      </Label>
      {/* <Controller
        control={control}
        name="revisitRate"
        render={({ field: { value, onChange } }) => (
          <Select
            id="revisitRate"
            fluid
            size="l"
            options={OPTIONS}
            value={value}
            onValueChange={onChange}
            placeholder="Select a revisit rate"
            disabled={isLoading}
            className="w-[286px]"
          />
        )}
      /> */}
    </div>
  );
};

export default memo(RevisitRateSelect);
