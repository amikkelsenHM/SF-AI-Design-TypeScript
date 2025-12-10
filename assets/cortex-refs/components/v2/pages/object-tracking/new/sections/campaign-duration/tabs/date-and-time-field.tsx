import { Input } from '@/components/components/ui/input';
import Calendar from '@/components/v2/icons/calendar';
import { ControlledDatePickerField } from '@/components/v2/inputs/controlled-date-picker';
import { formatDateInputValue } from '@/utils/v2/dates';
import { addHours } from 'date-fns';
import { useMemo, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { ObjectTrackingStatus } from '../../../../enums';
import { DURATION_IN_DAYS_TRANSFORMER } from '../../../transformers/transformers';
import { NewObjectTrackingFormData } from '../../../types';

interface DateAndTimeFieldProps {
  readOnly?: boolean;
  hasLabels?: boolean;
  status?: ObjectTrackingStatus;
  rules?: RegisterOptions<NewObjectTrackingFormData, 'startEndDates'>;
}

const DateAndTimeField = ({
  readOnly = false,
  hasLabels = true,
  status,
  rules,
}: DateAndTimeFieldProps) => {
  const { control, getValues } = useFormContext<NewObjectTrackingFormData>();
  const lockedDuration = useWatch({
    control,
    name: 'meta.lockedDuration',
  });

  const [open, setOpen] = useState(false);

  const dateLock = useMemo(() => {
    switch (status) {
      case ObjectTrackingStatus.COMPLETED:
        return { lockStart: true, disableAll: true };
      case ObjectTrackingStatus.ACTIVE:
        return { lockStart: true, disableAll: false };
      default:
        return { lockStart: false, disableAll: false };
    }
  }, [status]);

  const handleOpen = (value: boolean) => {
    if (readOnly) return;

    setOpen(value);
  };

  const labelProps = useMemo(
    () =>
      hasLabels
        ? {
            label: 'Duration',
            labelClassName: 'typography-body-sm text-foreground',
          }
        : {},
    [hasLabels]
  );

  return (
    <ControlledDatePickerField
      control={control}
      name="startEndDates"
      mode={lockedDuration ? 'single' : 'range'}
      withTime
      open={open}
      setOpen={handleOpen}
      lockStart={dateLock.lockStart}
      disableAll={dateLock.disableAll}
      rules={rules}
      {...labelProps}
      renderTrigger={({ value }, { error }) => (
        <Input
          id="startEndDates"
          value={formatDateInputValue(value)}
          readOnly={readOnly}
          placeholder="Start Date & Time – End Date & Time"
          inputSize="l"
          iconPosition="right"
          state={error ? 'error' : 'default'}
          icon={<Calendar />}
        />
      )}
      transform={{
        input: () => getValues('startEndDates'),
        output: (value) => {
          if (lockedDuration)
            return {
              from: value,
              to: addHours(value, lockedDuration.hours),
            };

          return value;
        },
        error: DURATION_IN_DAYS_TRANSFORMER.error,
      }}
    />
  );
};

export default DateAndTimeField;
