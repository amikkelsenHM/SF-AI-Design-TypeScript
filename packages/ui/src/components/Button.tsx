import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'lg' | 'icon' | 'icon-sm';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'sm', className = '', children, ...props }, ref) => {
    const variantClass = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      tertiary: 'btn-tertiary',
    }[variant];

    const sizeClass = {
      sm: '',
      lg: 'btn-lg',
      icon: 'btn-icon',
      'icon-sm': 'btn-icon-sm',
    }[size];

    const classes = ['btn', variantClass, sizeClass, className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
