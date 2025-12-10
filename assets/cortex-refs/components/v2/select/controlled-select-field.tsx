'use client';

import { Select } from '@/components/components/ui/select';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  CommonControlledFieldProps,
  ControlledField,
} from '../inputs/controlled-field';

export type Option = {
  value: string;
  label: string;
};

interface ControlledSelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends CommonControlledFieldProps<TFieldValues, TName> {
  placeholder?: string;
  options: Option[];
  size?: 'xs' | 's' | 'l';
  isMulti?: boolean;
  fluid?: boolean;
  disabled?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  readOnly?: boolean;
  avoidCollision?: boolean;
}

export const ControlledSelectField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  placeholder,
  options,
  size = 's',
  isMulti = false,
  fluid = false,
  labelClassName = 'text-foreground text-xs font-norlmal',
  disabled = false,
  readOnly = false,
  avoidCollision = true,
  ...controlledFieldProps
}: ControlledSelectFieldProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      labelClassName={labelClassName}
      {...controlledFieldProps}
      render={({ field, isLoading }) => (
        <Select
          {...field}
          id={field.name}
          onValueChange={field.onChange}
          options={options}
          placeholder={placeholder}
          size={size}
          isMulti={isMulti}
          fluid={fluid}
          disabled={isLoading || disabled}
          value={field.value}
          avoidCollision={avoidCollision}
        />
      )}
    />
  );
};
