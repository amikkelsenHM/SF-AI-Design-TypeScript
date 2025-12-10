import React from 'react';

interface ParentProps {
  color: string;
}

const MinusIcon: React.FC<ParentProps> = ({ color }: ParentProps) => {
  return (
    <svg
      data-testid="minus-icon"
      width="18"
      height="18"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.70386 5.475H0.0566406V6.80278H4.70386V5.475ZM6.03164 5.475V6.80278H10.6789V5.475H6.03164Z"
        fill={color}
      />
    </svg>
  );
};

export default MinusIcon;
