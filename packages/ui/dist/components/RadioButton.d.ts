import { default as React } from 'react';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}
export declare const RadioButton: React.ForwardRefExoticComponent<RadioButtonProps & React.RefAttributes<HTMLInputElement>>;
export default RadioButton;
//# sourceMappingURL=RadioButton.d.ts.map