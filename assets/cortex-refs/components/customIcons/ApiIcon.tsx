import React from 'react';

interface ParentProps {
  color: string;
  width?: string;
  height?: string;
}

const ApiIcon: React.FC<ParentProps> = ({
  color = '#45464E',
  width = '24',
  height = '24',
}: ParentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.31247 13.625L11.7206 2.75011V8.625V9.375H12.4706H18.6125L11.3382 20.4853V14.375V13.625H10.5882H5.31247Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ApiIcon;
