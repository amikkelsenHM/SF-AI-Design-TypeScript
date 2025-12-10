import React from 'react';

interface ParentProps {
  color: string;
}

const ApiKeyIcon: React.FC<ParentProps> = ({ color }: ParentProps) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.31247 13.625L7.72059 2.75011V8.625V9.375H8.47059H14.6125L7.33824 20.4853V14.375V13.625H6.58824H1.31247Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ApiKeyIcon;
