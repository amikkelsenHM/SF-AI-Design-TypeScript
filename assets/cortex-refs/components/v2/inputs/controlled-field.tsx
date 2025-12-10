import { Label } from '@/components/components/ui/label';
import { ITooltip } from 'models/interfaces/v2/tooltip/ITooltip';
import { ReactElement, useCallback, useMemo } from 'react';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldError as FieldErrorType,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import SfTooltip from '../tooltip/sf-tooltip';
import { FieldError } from './field-error';

type ComplexFieldError<TInput> = FieldErrorType &
  Record<keyof TInput, FieldErrorType | undefined>;
export interface Transform<TInput> {
  input: (value: TInput | undefined) => any;
  output: (event: any) => TInput;
  error?: (
    error: ComplexFieldError<TInput> | undefined
  ) => FieldErrorType | undefined;
}

interface RenderProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
}

export interface CommonControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  hideErrorMessage?: boolean;
  isLoading?: boolean;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  transform?: Transform<TFieldValues[TName]>;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  tooltipConfig?: ITooltip;
}

interface ControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends CommonControlledFieldProps<TFieldValues, TName> {
  render: (
    props: RenderProps<TFieldValues, TName> & {
      isLoading: boolean;
    }
  ) => ReactElement;
}

export const ControlledField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  labelClassName,
  required = false,
  hideErrorMessage = false,
  isLoading = false,
  rules = {},
  transform,
  render,
  defaultValue,
  tooltipConfig,
}: ControlledFieldProps<TFieldValues, TName>) => {
  const validationRules = useMemo(
    () => ({
      required,
      ...rules,
    }),
    [required, rules]
  );

  const renderField = useCallback(
    ({ field, fieldState }: RenderProps<TFieldValues, TName>) => {
      const transformedField = transform
        ? {
            ...field,
            value: transform.input(field.value),
            onChange: (event: any) => field.onChange(transform.output(event)),
          }
        : field;

      const transformedError =
        transform?.error?.(
          fieldState.error as ComplexFieldError<TFieldValues[TName]>
        ) || fieldState.error;

      const fieldElement = (
        <div className="flex flex-col gap-1">
          {render({ field: transformedField, fieldState, isLoading })}
          <FieldError error={transformedError} hideError={hideErrorMessage} />
        </div>
      );

      return tooltipConfig ? (
        <SfTooltip
          {...tooltipConfig}
          trigger={fieldElement}
          triggerProps={{ className: 'w-fit' }}
        />
      ) : (
        fieldElement
      );
    },
    [transform, render, isLoading, hideErrorMessage, tooltipConfig]
  );

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={validationRules}
        render={renderField}
      />
    </div>
  );
};
