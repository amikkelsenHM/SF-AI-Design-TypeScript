import { ControlledTextareaField } from '@/components/v2/inputs/controlled-textarea-field';
import { useFormContext } from 'react-hook-form';
import { TLE_TRANSFORMER } from '../../../transformers/transformers';
import { NewObjectTrackingFormData } from '../../../types';

const DEFAULT_ROWS_COUNT = 12;

const TLEField = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();

  return (
    <ControlledTextareaField
      control={control}
      name="trackMethod"
      label="TLE"
      placeholder="Input a TLE"
      labelClassName="typography-body-sm text-foreground"
      rows={DEFAULT_ROWS_COUNT}
      transform={TLE_TRANSFORMER}
    />
  );
};

export default TLEField;
