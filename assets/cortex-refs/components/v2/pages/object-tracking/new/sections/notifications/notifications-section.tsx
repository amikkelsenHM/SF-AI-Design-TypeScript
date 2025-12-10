import { Checkbox } from '@/components/components/ui/checkbox';
import { Label } from '@/components/components/ui/label';
import { FormSection } from '@/components/v2/pages/object-tracking/common/form/form-section';
import { Controller, useFormContext } from 'react-hook-form';
import { NewObjectTrackingFormData } from '../../types';

const NotificationsSection = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();

  return (
    <FormSection title="Notifications">
      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name="firstObservationNotification"
          render={({ field: { value, onChange } }) => (
            <Label
              htmlFor="firstObservationNotification"
              className="typography-body-sm text-foreground cursor-pointer flex items-center gap-2 w-fit"
            >
              <Checkbox
                id="firstObservationNotification"
                checked={value}
                onCheckedChange={onChange}
              />
              <span>
                Send an email notification when the object is first detected
              </span>
            </Label>
          )}
        />

        {/* TODO: add path for manage notifications */}
        {/* <Link
          href="#"
          className="typography-body-sm text-medium-orchid hover:underline w-fit"
        >
          Manage Notifications
        </Link> */}
      </div>
    </FormSection>
  );
};

export default NotificationsSection;
