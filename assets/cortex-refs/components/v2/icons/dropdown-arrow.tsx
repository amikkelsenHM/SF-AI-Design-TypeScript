interface DropdownArrowProps {
  open: boolean;
}

const DropdownArrow = ({ open }: DropdownArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    transform={open ? 'rotate(180)' : ''}
  >
    <path
      d="M5 7L5 9.73405L11.8351 16.5692L18.6704 9.73395L18.6703 7L11.8351 13.8351L5 7Z"
      fill="#EEEEEE"
    />
  </svg>
);

export default DropdownArrow;
