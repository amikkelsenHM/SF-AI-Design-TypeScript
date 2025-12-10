import { Checkbox } from '@/components/components/ui/checkbox';
import { Label } from '@/components/components/ui/label';
import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../lib/utils';
import {
  CommonControlledFieldProps,
  ControlledField,
} from './controlled-field';

interface ControlledCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<CommonControlledFieldProps<TFieldValues, TName>, 'label'> {
  label: ReactNode;
  disabled?: boolean;
}

export const ControlledCheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  disabled = false,
  label,
  labelClassName,
  ...controlledFieldProps
}: ControlledCheckboxProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      {...controlledFieldProps}
      render={({ field: { name, value, onChange, ref } }) => (
        <Label
          htmlFor={name}
          className={cn(
            'cursor-pointer flex items-center gap-2 w-fit',
            labelClassName
          )}
        >
          <Checkbox
            ref={ref}
            checked={value}
            onCheckedChange={onChange}
            id={name}
            disabled={disabled}
          />
          <span>{label}</span>
        </Label>
      )}
    />
  );
};
