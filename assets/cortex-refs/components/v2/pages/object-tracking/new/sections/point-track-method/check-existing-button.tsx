import { Button } from '@/components/components/ui/button';
import { cn } from '@/components/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ObjectTrackingTargetMode } from '../../../enums';
import { NewObjectTrackingFormData } from '../../types';

interface CheckExistingButtonProps {
  mode: ObjectTrackingTargetMode;
}

const CheckExistingButton = ({ mode }: CheckExistingButtonProps) => {
  const {
    getValues,
    formState: { errors },
  } = useFormContext<NewObjectTrackingFormData>();

  const handleCheck = () => {
    const value = getValues('trackMethod');
    console.log(value);
    // TODO: in the old implementation the checking is available only if orbital regime is set to leo
    // Clarify how we should handle this in the new UI, since there is no orbital regime section according to design
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      onClick={handleCheck}
      className={cn(
        'h-auto',
        mode === ObjectTrackingTargetMode.TLE ? 'self-start mt-8' : 'self-end',
        mode !== ObjectTrackingTargetMode.TLE && errors.trackMethod && 'mb-4'
      )}
      // TODO: enable button when API is ready
      disabled
    >
      Check Existing
    </Button>
  );
};

export default CheckExistingButton;
