import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const classes = ['input-field', error ? 'error' : '', className].filter(Boolean).join(' ');

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
