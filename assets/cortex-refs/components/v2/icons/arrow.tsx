function Arrow({
  rotate = 0,
  className,
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.96573 10.5185L16.269 10.5185L10.4005 4.65004L11.7674 4.65015L13.1345 4.65004L19.9697 11.4852L13.1344 18.3204L11.7674 18.3204L10.4005 18.3203L16.269 12.4518L3.96573 12.4518L3.96573 10.5185Z"
        fill="#EEEEEE"
      />
    </svg>
  );
}

export default Arrow;
