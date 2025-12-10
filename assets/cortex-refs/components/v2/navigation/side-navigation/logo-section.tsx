'use client';

import { useSidebar } from '@/components/components/ui/sidebar';
import { useNavigation } from 'hooks/useNavigation';
import Image from 'next/image';
import Logo from '../../icons/logo';
import { LOGO_CONFIG } from './logo-config';
import { LogoWrapper } from './logo-wrapper';

export default function LogoSection() {
  const { navigate } = useNavigation({ linkTo: '/' });
  const { state } = useSidebar();

  const isCollapsed = state === 'collapsed';
  const isExpanded = state === 'expanded';

  return (
    <button
      type="button"
      className="logo-container w-full cursor-pointer flex items-center relative mt-3.5 justify-center"
      style={{ height: LOGO_CONFIG.CONTAINER.HEIGHT }}
      onClick={(e) => {
        e.stopPropagation();
        navigate();
      }}
    >
      <LogoWrapper isVisible={isCollapsed} ariaHidden={!isCollapsed}>
        <Image
          src={LOGO_CONFIG.SMALL.SRC}
          alt={LOGO_CONFIG.SMALL.ALT}
          width={LOGO_CONFIG.SMALL.WIDTH}
          height={LOGO_CONFIG.SMALL.HEIGHT}
          priority={LOGO_CONFIG.SMALL.PRIORITY}
        />
      </LogoWrapper>

      <LogoWrapper isVisible={isExpanded} ariaHidden={!isExpanded}>
        <Logo />
      </LogoWrapper>
    </button>
  );
}
