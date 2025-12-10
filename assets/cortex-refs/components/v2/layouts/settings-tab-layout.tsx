'use client';

import { Button } from '@/components/components/ui/button';
import { Separator } from '@/components/components/ui/separator';
import { cn } from '@/components/lib/utils';
import { FC, ReactNode, useRef, useState } from 'react';

export interface SettingsTabSection {
  id: string;
  label: string;
  content: ReactNode;
  showSeparator?: boolean;
  anchorId?: string;
  visibleWhen?: (has: (s: any) => boolean) => boolean;
}

interface SettingsTabLayoutProps {
  sections: SettingsTabSection[];
  separatorWidth?: string;
  maxWidth?: string;
}

const SettingsTabLayout: FC<SettingsTabLayoutProps> = ({
  sections,
  separatorWidth,
  maxWidth = 'max-w-[calc(100%_-_var(--settings-aside-width))]',
}) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');
  const [translateY, setTranslateY] = useState(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const slideTo = (id: string, anchorId?: string) => {
    const target =
      (anchorId && document.getElementById(anchorId)) ||
      sectionRefs.current[id];
    const wrapper = wrapperRef.current;
    if (!target || !wrapper) return;

    const targetRect = target.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const offset = targetRect.top - wrapperRect.top;

    setTranslateY(-offset);
    setActiveId(id);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (e.deltaY >= 0) return;

    const activeIndex = sections.findIndex((s) => s.id === activeId);
    if (activeIndex <= 0) return;

    const prevSection = sections[activeIndex - 1];
    slideTo(prevSection.id);
  };

  return (
    <div
      onWheel={onWheel}
      className="flex gap-3 [--settings-aside-width:165px]"
    >
      <div className="w-[var(--settings-aside-width)] border-r border-background-progress shrink-0">
        <aside className="flex flex-col absolute gap-3 pt-3 pl-4.5">
          {sections.map(({ id, label, anchorId }) => (
            <Button
              key={id}
              variant="tertiary"
              className={cn(
                'justify-start capitalize w-full',
                activeId === id &&
                  'bg-background-progress border-background-progress'
              )}
              onClick={() => slideTo(id, anchorId)}
            >
              {label}
            </Button>
          ))}
        </aside>
      </div>

      <div
        className={cn('flex-1 py-3 px-6 overflow-hidden relative', maxWidth)}
      >
        <div
          ref={wrapperRef}
          className="transition-transform duration-500 will-change-transform"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {sections.map(({ id, content, showSeparator }) => (
            <div
              key={id}
              id={id}
              ref={(el: HTMLElement | null) => {
                sectionRefs.current[id] = el;
              }}
              className="mb-6"
            >
              {content}
              {showSeparator ?? (
                <Separator
                  className={cn(
                    'mt-11 mb-8 bg-border-progress',
                    separatorWidth
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsTabLayout;
