import React, { useState, useRef, useEffect } from 'react';

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

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Select...',
  onChange,
  error = false,
  success = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerClasses = [
    'dropdown-trigger',
    isOpen ? 'open' : '',
    error ? 'error' : '',
    success ? 'success' : '',
  ].filter(Boolean).join(' ');

  const menuClasses = ['dropdown-menu', isOpen ? 'open' : ''].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={`dropdown-container ${className}`}>
      <button
        type="button"
        className={triggerClasses}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <span className="dropdown-chevron" />
      </button>
      <div className={menuClasses} role="listbox">
        {options.map((option) => (
          <div
            key={option.value}
            className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
            role="option"
            aria-selected={value === option.value}
            onClick={() => {
              onChange?.(option.value);
              setIsOpen(false);
            }}
          >
            {option.icon}
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
