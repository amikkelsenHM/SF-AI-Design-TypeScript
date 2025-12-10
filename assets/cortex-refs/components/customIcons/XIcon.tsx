import React from 'react';

interface ParentProps {
  color?: string;
  width?: string;
  height?: string;
}

const XIcon: React.FC<ParentProps> = ({
  color = '#DF1515',
  width = '17',
  height = '16',
}: ParentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.64256 0.0450672L0.874794 1.81283L7.06196 8L0.874794 14.1872L2.64256 15.9549L8.82973 9.76777L15.0169 15.955L16.7847 14.1872L10.5975 8L16.7847 1.8128L15.0169 0.04503L8.82973 6.23223L2.64256 0.0450672ZM8.82973 6.23223L7.06196 8L8.82973 9.76777L10.5975 8L8.82973 6.23223Z"
        fill={color}
      />
    </svg>
  );
};

export default XIcon;
