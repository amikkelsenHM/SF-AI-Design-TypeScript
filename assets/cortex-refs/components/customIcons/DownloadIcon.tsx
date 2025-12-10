import React from 'react';

interface ParentProps {
  color?: string;
  width?: string;
  height?: string;
}

const DownloadIcon: React.FC<ParentProps> = ({
  color = '#6B29AE',
  width = '17',
  height = '16',
}: ParentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.70497 0V8.06326L2.38289 4.74118L0.968674 6.1554L5.99786 11.1846L6.70497 11.8917L7.41208 11.1846L12.4413 6.1554L11.0271 4.74118L7.70497 8.06326V0H5.70497ZM0 15.2493L13.4112 15.2493V13.2493L0 13.2493V15.2493Z"
        fill={color}
      />
    </svg>
  );
};

export default DownloadIcon;
