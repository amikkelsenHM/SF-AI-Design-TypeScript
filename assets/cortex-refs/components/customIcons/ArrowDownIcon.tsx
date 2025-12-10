import React from 'react';

interface ParentProps {
  color: string;
}

const ArrowDown: React.FC<ParentProps> = ({ color }: ParentProps) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.00016L5 9.73421L11.8351 16.5693L18.6704 9.73411L18.6703 7.00016L11.8351 13.8353L5 7.00016Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDown;
