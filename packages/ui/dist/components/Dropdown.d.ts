import { default as React } from 'react';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}
export interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    error?: boolean;
    success?: boolean;
    className?: string;
}
export declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map