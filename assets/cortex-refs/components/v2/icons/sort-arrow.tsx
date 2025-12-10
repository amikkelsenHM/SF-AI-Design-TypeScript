export const SortArrow = ({
  rotate = 0,
  className,
}: {
  rotate?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
    className={className}
  >
    <path d="M10 12L6 8H14L10 12Z" fill="#EEEEEE" />
  </svg>
);
