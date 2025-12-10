import React from 'react';

interface ParentProps {
  color?: string;
  width?: string;
  height?: string;
}

const TickIcon: React.FC<ParentProps> = ({
  color = '#23A74F',
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
        d="M3.76777 8.18414L2 9.9519L14.0457 21.9977L15.8135 20.2299L15.8119 20.2283L21.9959 14.0443L20.2281 12.2765L14.0441 18.4605L3.76777 8.18414ZM14.0441 18.4605L12.2783 20.2263L14.0461 21.9941L15.8119 20.2283L14.0441 18.4605Z"
        fill={color}
      />
    </svg>
  );
};

export default TickIcon;
