import { ComponentProps } from 'react';

interface ChevronProps extends ComponentProps<'svg'> {
  rotate?: number;
}

function Chevron({ rotate = 0, className, ...props }: ChevronProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={className}
      {...props}
    >
      <path
        d="M9.96875 10.9062L13.9062 6.96875L14.9687 8.03125L9.96875 13.0312L4.96875 8.03125L6.03125 6.96875L9.96875 10.9062Z"
        fill="#EEEEEE"
      />
    </svg>
  );
}

export default Chevron;
