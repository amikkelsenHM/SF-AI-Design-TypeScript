interface HazardIcon {
  width?: string;
  height?: string;
  color?: string;
}

function HazardIcon({
  color = '#EEEEEE',
  width = '22',
  height = '19',
}: HazardIcon) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 19H22L11 0L0 19ZM3.47 17L11 3.99L18.53 17H3.47ZM10 14H12V16H10V14ZM10 8H12V12H10V8Z"
        fill={color}
      />
    </svg>
  );
}

export default HazardIcon;
