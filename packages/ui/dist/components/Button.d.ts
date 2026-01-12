import { default as React } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'lg' | 'icon' | 'icon-sm';
    children: React.ReactNode;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map