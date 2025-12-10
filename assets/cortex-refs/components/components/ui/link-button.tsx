import Link from 'next/link';
import { MouseEvent } from 'react';
import { Button, ButtonProps } from './button';

interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  href: string;
}

function LinkButton({ href, ...buttonProps }: LinkButtonProps) {
  const handleClick = (e: MouseEvent) => {
    if (buttonProps.disabled) e.preventDefault();
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Button type="button" {...buttonProps} />
    </Link>
  );
}

export { LinkButton };
