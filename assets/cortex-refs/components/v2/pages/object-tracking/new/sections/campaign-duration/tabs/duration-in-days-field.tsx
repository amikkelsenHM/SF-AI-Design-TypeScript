import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { useFormContext } from 'react-hook-form';
import { DURATION_IN_DAYS_TRANSFORMER } from '../../../transformers/transformers';
import { NewObjectTrackingFormData } from '../../../types';

const DurationInDaysField = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();

  return (
    <div className="w-1/2">
      <ControlledInputField
        control={control}
        type="number"
        name="startEndDates"
        inputSize="l"
        labelClassName="typography-body-sm text-foreground"
        placeholder="Input a number"
        label="Duration In Days"
        transform={DURATION_IN_DAYS_TRANSFORMER}
      />
    </div>
  );
};

export default DurationInDaysField;
