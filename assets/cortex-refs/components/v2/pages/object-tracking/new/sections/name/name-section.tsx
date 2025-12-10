import { ControlledInputField } from '@/components/v2/inputs/controlled-input-field';
import { useFormContext } from 'react-hook-form';
import { FormSection } from '../../../common/form/form-section';
import { NewObjectTrackingFormData } from '../../types';

const LABEL_CLASSNAME = 'typography-body-sm text-foreground';

const NameSection = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();

  return (
    <FormSection>
      <ControlledInputField
        control={control}
        name="name"
        inputSize="l"
        placeholder="Enter a name"
        required
        label="Task Name"
        labelClassName={LABEL_CLASSNAME}
      />
    </FormSection>
  );
};

export default NameSection;
