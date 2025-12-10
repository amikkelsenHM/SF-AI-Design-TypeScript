import React from 'react';

interface ParentProps {
  color: string;
  width?: string;
  height?: string;
}

const ArchiveIcon: React.FC<ParentProps> = ({
  color = '#3F4044',
}: ParentProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 21V5.775L5.05 3H18.925L21 5.775V21H3ZM4.925 5.65H19.05L18.15 4.5H5.825L4.925 5.65ZM4.5 19.5H19.5V7.15H4.5V19.5ZM12 17.25L15.9 13.35L14.9 12.35L12.75 14.5V9.475H11.25V14.5L9.1 12.35L8.1 13.35L12 17.25Z"
        fill={color}
      />
    </svg>
  );
};

export default ArchiveIcon;
