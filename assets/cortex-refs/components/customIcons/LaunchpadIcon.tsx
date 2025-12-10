import React from 'react';

interface ParentProps {
  color: string;
  width: string;
  height: string;
}

const LaunchpadIcon: React.FC<ParentProps> = ({
  color,
  width = '24px',
  height = '24px',
}: ParentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="16" height="16" stroke={color} strokeWidth="2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3H11V11H3V13H11V21H13V13H21V11H13V3ZM13 11H11V13H13V11Z"
        fill={color}
      />
    </svg>
  );
};

export default LaunchpadIcon;
