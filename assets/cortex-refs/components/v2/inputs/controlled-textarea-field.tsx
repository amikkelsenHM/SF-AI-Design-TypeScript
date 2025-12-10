'use client';

import { Textarea } from '@/components/components/ui/textarea';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  CommonControlledFieldProps,
  ControlledField,
} from './controlled-field';

interface ControlledTextareaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends CommonControlledFieldProps<TFieldValues, TName> {
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
}

export const ControlledTextareaField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  placeholder,
  rows,
  readOnly,
  ...controlledFieldProps
}: ControlledTextareaFieldProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      {...controlledFieldProps}
      render={({ field, fieldState, isLoading }) => (
        <Textarea
          {...field}
          value={field.value || ''}
          id={field.name}
          placeholder={placeholder}
          rows={rows}
          state={fieldState.error ? 'error' : 'default'}
          disabled={isLoading}
          readOnly={readOnly}
        />
      )}
    />
  );
};
