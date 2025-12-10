import React from 'react';

interface ParentProps {
  color: string;
}

const CustomColumnsIcon: React.FC<ParentProps> = ({ color }: ParentProps) => {
  return (
    <svg
      width="56"
      height="48"
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 22H33V17H25.5M21 22V29H25.5V17M21 22V19.5L23.25 17H25.5"
        stroke="#3F4044"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.9692 24.7143L35.9385 28.1606L33.9385 31.6247L29.9692 31.6425L28 28.1962L30 24.7321L33.9692 24.7143ZM31.3843 29.3938C31.9793 29.7374 32.7401 29.5335 33.0836 28.9385C33.4271 28.3435 33.2233 27.5827 32.6283 27.2392C32.0333 26.8957 31.2725 27.0995 30.9289 27.6945C30.5854 28.2895 30.7893 29.0503 31.3843 29.3938Z"
        fill="#3F4044"
      />
    </svg>
  );
};

export default CustomColumnsIcon;
