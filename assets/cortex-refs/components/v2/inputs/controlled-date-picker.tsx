import { cloneElement, isValidElement, ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { CalendarProps } from '../../components/ui/calendar/calendar';
import { DatePicker } from '../date-picker/date-picker';
import {
  CommonControlledFieldProps,
  ControlledField,
} from './controlled-field';

interface ControlledDatePickerFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends CommonControlledFieldProps<TFieldValues, TName> {
  mode: CalendarProps['mode'];
  withTime?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  renderTrigger: (
    field: ControllerRenderProps<TFieldValues, TName>,
    fieldState: ControllerFieldState
  ) => ReactNode;
  lockStart?: boolean;
  disableAll?: boolean;
  rules?: RegisterOptions<TFieldValues, TName>;
}

export const ControlledDatePickerField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  mode,
  withTime,
  open,
  setOpen,
  renderTrigger,
  lockStart,
  disableAll,
  rules,
  ...controlledFieldProps
}: ControlledDatePickerFieldProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      {...controlledFieldProps}
      rules={rules}
      render={({ field, fieldState }) => {
        let triggerNode = renderTrigger(field, fieldState);

        if (isValidElement(triggerNode)) {
          triggerNode = cloneElement(triggerNode, {
            ref: field.ref,
            ...triggerNode.props,
          });
        }

        return (
          <DatePicker
            open={open}
            setOpen={setOpen}
            mode={mode as any}
            withTime={withTime}
            trigger={triggerNode}
            selected={mode === 'single' ? field.value?.from : field.value}
            onSelect={field.onChange}
            lockStart={lockStart}
            disableAll={disableAll}
          />
        );
      }}
    />
  );
};
