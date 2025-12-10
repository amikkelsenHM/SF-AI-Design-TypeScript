import { forwardRef, WheelEvent } from 'react';
import {
  FieldContainer,
  FieldContainerProps,
  useInputted,
} from './field-container';

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'prefix' | 'suffix'
    >,
    Omit<FieldContainerProps, 'children' | 'multiline' | 'onClick'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type,
    inputSize,
    state,
    readOnly,
    disabled,
    value,
    defaultValue,
    icon,
    iconPosition,
    prefix,
    suffix,
    onChange,
    ...props
  },
  ref
) {
  const { inputed, handleChange } = useInputted(value, defaultValue, onChange);

  const handleWheel = (event: WheelEvent<HTMLInputElement>) =>
    event.currentTarget.blur();

  return (
    <FieldContainer
      className={className}
      inputSize={inputSize}
      state={state}
      icon={icon}
      iconPosition={iconPosition}
      inputed={inputed}
      prefix={prefix}
      suffix={suffix}
    >
      <input
        ref={ref}
        type={type}
        data-slot="input"
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onWheel={handleWheel}
        className="bg-transparent w-full h-full border-none outline-none placeholder:text-inherit autofill:shadow-autofill-progress file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium"
        {...props}
      />
    </FieldContainer>
  );
});

export { Input };
