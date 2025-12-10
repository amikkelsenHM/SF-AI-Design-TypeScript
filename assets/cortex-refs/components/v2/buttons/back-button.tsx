'use client';

import { Button } from '@/components/components/ui/button';
import { useNavigation } from 'hooks/useNavigation';
import Arrow from '../icons/arrow';

interface BackButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  rotateIcon?: boolean;
  fallbackTo?: string;
}

const ROTATION_ANGLES = {
  DEFAULT: 0,
  FLIPPED: 180,
} as const;

const BackButton = ({
  label = 'Back',
  variant = 'tertiary',
  rotateIcon = true,
  fallbackTo,
}: BackButtonProps) => {
  const { navigate } = useNavigation({
    back: true,
    linkTo: fallbackTo,
  });

  return (
    <Button variant={variant} iconPosition="left" onClick={navigate}>
      <Arrow
        rotate={rotateIcon ? ROTATION_ANGLES.FLIPPED : ROTATION_ANGLES.DEFAULT}
        className="size-5"
      />
      {label}
    </Button>
  );
};

export default BackButton;
