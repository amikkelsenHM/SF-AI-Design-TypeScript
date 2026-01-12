import React from 'react';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className = '', label, id, ...props }, ref) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          className={['radio-input', className].filter(Boolean).join(' ')}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className="text-body-small" style={{ cursor: 'pointer' }}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
