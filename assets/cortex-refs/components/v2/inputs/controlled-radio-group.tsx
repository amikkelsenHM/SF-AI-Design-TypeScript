import { FieldPath, FieldValues } from 'react-hook-form';
import { RadioGroup, RadioGroupOption } from '../../components/ui/radio-group';
import {
  CommonControlledFieldProps,
  ControlledField,
} from './controlled-field';

interface ControlledRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<
    CommonControlledFieldProps<TFieldValues, TName>,
    'tooltipConfig'
  > {
  label?: never;
  options: RadioGroupOption[];
  size?: 's' | 'l';
}

export const ControlledRadioGroupField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  labelClassName,
  options,
  size,
  ...controlledFieldProps
}: ControlledRadioGroupProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      {...controlledFieldProps}
      render={({ field: { name, value, onChange, ref } }) => (
        <RadioGroup
          ref={ref}
          size={size}
          labelClassName={labelClassName}
          options={options}
          name={name}
          value={value}
          onValueChange={onChange}
        />
      )}
    />
  );
};
