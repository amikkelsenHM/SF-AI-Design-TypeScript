import { Label } from '@/components/components/ui/label';
import { Skeleton } from '@/components/components/ui/skeleton';
import { cn } from '@/components/lib/utils';
import { DEFAULT_ROWS_COUNT } from '@/utils/v2/common/constants';
import {
  HTMLInputTypeAttribute,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { ControlledInputField } from '../../inputs/controlled-input-field';
import { ControlledTextareaField } from '../../inputs/controlled-textarea-field';
import { ControlledSelectField } from '../../select/controlled-select-field';
import { EditableControls } from './editable-controls';

type Option = {
  value: string;
  label: string;
};

interface EditableFieldProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  registerOptions?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  inputSize?: 'xs' | 's' | 'l';
  iconButtonSize?: 'icon' | 'icon-sm';
  className?: string;
  labelClassName?: string;
  isLoading?: boolean;
  isInitialLoading?: boolean;
  hideError?: boolean;
  render?: (isEditing: boolean) => ReactNode;
  onEditStart?: () => void;
  onEditEnd?: () => void;
  onEditCancel?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  editor?: FieldEditor;
  selectOptions?: Option[];
  rows?: number;
}

type FieldEditor = 'input' | 'password' | 'select' | 'textarea';

const EditableField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  inputSize,
  iconButtonSize = 'icon-sm',
  type,
  registerOptions,
  render,
  className,
  labelClassName,
  isLoading = false,
  isInitialLoading = false,
  hideError = false,
  onEditStart,
  onEditEnd,
  onEditCancel,
  disabled,
  readOnly,
  editor = 'input',
  rows,
  selectOptions = [],
}: EditableFieldProps<T>) => {
  const { getValues, setValue, control } = useFormContext<T>();

  const [isEditing, setIsEditing] = useState(false);
  const initialValueRef = useRef(getValues(name));
  const initialValue = initialValueRef.current;

  const toggleEditing = useCallback(() => {
    if (isEditing) {
      setValue(name, initialValue, { shouldValidate: true });
      setIsEditing(false);
      onEditCancel?.();
    } else {
      initialValueRef.current = getValues(name);
      setIsEditing(true);
      onEditStart?.();
    }
  }, [
    isEditing,
    setValue,
    name,
    initialValue,
    getValues,
    onEditCancel,
    onEditStart,
  ]);

  const handleFinishEditing = useCallback(() => {
    setIsEditing(false);
    onEditEnd?.();
  }, [onEditEnd]);

  const effectiveEditor: FieldEditor = useMemo(() => {
    if (editor) return editor;
    return type === 'password' ? 'password' : 'input';
  }, [editor, type]);

  return (
    <div className={cn('grid grid-cols-[1fr_auto] gap-2', className)}>
      <Label htmlFor={name} className={cn('col-span-full', labelClassName)}>
        {label}
      </Label>

      {isInitialLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : render ? (
        render(isEditing)
      ) : isEditing && effectiveEditor === 'select' ? (
        <ControlledSelectField
          control={control}
          name={name}
          options={selectOptions}
          labelClassName={labelClassName}
          isLoading={isLoading}
          readOnly={!isEditing || readOnly}
        />
      ) : effectiveEditor === 'textarea' ? (
        <ControlledTextareaField
          control={control}
          name={name}
          rows={rows ?? DEFAULT_ROWS_COUNT}
          placeholder={placeholder}
          labelClassName={labelClassName}
          isLoading={isLoading}
          readOnly={!isEditing || readOnly}
          rules={registerOptions}
        />
      ) : (
        <ControlledInputField
          control={control}
          name={name}
          type={effectiveEditor === 'password' ? 'password' : type}
          placeholder={placeholder}
          labelClassName={labelClassName}
          inputSize={inputSize}
          rules={registerOptions}
          isLoading={isLoading}
          readOnly={!isEditing || readOnly}
        />
      )}

      {!readOnly && (
        <div className="self-start">
          <EditableControls
            isEditing={isEditing}
            isLoading={isLoading}
            size={iconButtonSize}
            onStartEdit={toggleEditing}
            onCancel={toggleEditing}
            onConfirm={handleFinishEditing}
          />
        </div>
      )}
    </div>
  );
};

export default EditableField;
