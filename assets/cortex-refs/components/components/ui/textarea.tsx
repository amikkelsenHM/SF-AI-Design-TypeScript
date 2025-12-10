import {
  FieldContainer,
  FieldContainerProps,
  useInputted,
} from './field-container';

interface TextareaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'size' | 'prefix' | 'suffix'
    >,
    Omit<
      FieldContainerProps,
      'children' | 'inputSize' | 'multiline' | 'onClick' | 'prefix' | 'suffix'
    > {}

function Textarea({
  className,
  state,
  readOnly,
  disabled,
  value,
  defaultValue,
  icon,
  iconPosition,
  onChange,
  ...props
}: TextareaProps) {
  const { inputed, handleChange } = useInputted(value, defaultValue, onChange);

  return (
    <FieldContainer
      className={className}
      state={state}
      icon={icon}
      iconPosition={iconPosition}
      inputed={inputed}
      multiline
    >
      <textarea
        data-slot="textarea"
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="bg-transparent w-full h-full border-none outline-none placeholder:text-inherit autofill:shadow-autofill-progress resize-none"
        {...props}
      />
    </FieldContainer>
  );
}

export { Textarea };
