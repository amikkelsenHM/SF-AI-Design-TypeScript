import { Combobox } from '@/components/components/ui/combobox';
import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { SelectOption } from '../../components/ui/select/utils';
import { ControlledField } from './controlled-field';
import { ControlledInputFieldProps } from './controlled-input-field';

interface ControlledComboboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends ControlledInputFieldProps<TFieldValues, TName> {
  isLoadingNextPage?: boolean;
  loadMoreElement?: ReactNode;
  options: SelectOption[];
  search: string;
  onSearchChange: (newValue: string) => void;
}

export const ControlledComboboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  placeholder,
  type = 'text',
  inputSize = 's',
  className,
  readOnly,
  options,
  search,
  isLoading,
  isLoadingNextPage,
  loadMoreElement,
  onSearchChange,
  ...controlledFieldProps
}: ControlledComboboxFieldProps<TFieldValues, TName>) => {
  return (
    <ControlledField
      {...controlledFieldProps}
      render={({ field, fieldState: { error } }) => (
        <Combobox
          {...field}
          value={field.value?.toString() || ''}
          id={field.name}
          placeholder={placeholder}
          inputSize={inputSize}
          state={error ? 'error' : 'default'}
          isLoading={isLoading}
          isLoadingNextPage={isLoadingNextPage}
          loadMoreElement={loadMoreElement}
          className={className}
          readOnly={readOnly}
          options={options}
          search={search}
          onSearchChange={onSearchChange}
        />
      )}
    />
  );
};
