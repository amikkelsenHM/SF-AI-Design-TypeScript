import { Input } from '@/components/components/ui/input';
import { PasswordInput } from '@/components/components/ui/password-input';
import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  CommonControlledFieldProps,
  ControlledField,
} from './controlled-field';

export interface ControlledInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends CommonControlledFieldProps<TFieldValues, TName> {
  placeholder?: string;
  type?: string;
  inputSize?: 'xs' | 's' | 'l';
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  readOnly?: boolean;
}

export const ControlledInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  placeholder,
  type = 'text',
  inputSize = 's',
  className,
  readOnly,
  prefix,
  suffix,
  ...controlledFieldProps
}: ControlledInputFieldProps<TFieldValues, TName>) => {
  const InputComponent = type === 'password' ? PasswordInput : Input;

  return (
    <ControlledField
      {...controlledFieldProps}
      render={({ field, fieldState: { error }, isLoading }) => (
        <InputComponent
          {...field}
          value={field.value?.toString() || ''}
          id={field.name}
          placeholder={placeholder}
          type={type}
          inputSize={inputSize}
          state={error ? 'error' : 'default'}
          disabled={isLoading}
          className={className}
          readOnly={readOnly}
          prefix={prefix}
          suffix={suffix}
        />
      )}
    />
  );
};
