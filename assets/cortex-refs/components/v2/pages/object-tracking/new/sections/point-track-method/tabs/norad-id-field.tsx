import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { useFormContext } from 'react-hook-form';
import { NORAD_ID_TRANSFORMER } from '../../../transformers/transformers';
import { NewObjectTrackingFormData } from '../../../types';

const NoradIdField = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();

  return (
    <ControlledInputField
      control={control}
      name="trackMethod"
      label="Norad ID"
      placeholder="Input an ID"
      inputSize="l"
      type="number"
      labelClassName="typography-body-sm text-foreground"
      className="max-w-85"
      transform={NORAD_ID_TRANSFORMER}
    />
  );
};

export default NoradIdField;
