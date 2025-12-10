import React from 'react';

interface ParentProps {
  color: string;
  width?: string;
  height?: string;
}

const PlusIcon: React.FC<ParentProps> = ({
  color,
  width = '24',
  height = '24',
}: ParentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4H11V11H4V13H11V20H13V13H20V11H13V4ZM13 11H11V13H13V11Z"
        fill={color}
      />
    </svg>
  );
};

export default PlusIcon;
