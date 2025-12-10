'use client';
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/components/ui/sidebar';
import { INavigationItem } from 'models/interfaces/v2/navigation';
import { usePathname } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Chevron from '../icons/chevron';

type NavigationItemProps = INavigationItem;

export function NavigationItem({
  icon,
  name,
  path,
  children,
  exact,
}: NavigationItemProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getIsItemActive = useCallback(
    (path: string, exact?: boolean) =>
      exact ? pathname === path : pathname?.startsWith(path) ?? false,
    [pathname]
  );

  const hasActiveChildren = useMemo(
    () => children?.some((child) => getIsItemActive(child.path, child.exact)),
    [children, getIsItemActive]
  );

  const isActive = useMemo(
    () => getIsItemActive(path, exact),
    [getIsItemActive]
  );

  const handleChevronClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (hasActiveChildren) setOpen(true);
  }, [hasActiveChildren]);

  if (!children)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          href={path}
          isActive={isActive}
          icon={icon}
          label={name}
        />
      </SidebarMenuItem>
    );

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible flex flex-col w-full relative"
        open={open}
        onOpenChange={setOpen}
      >
        <SidebarMenuButton
          href={path}
          isActive={isActive}
          hasActiveChildren={hasActiveChildren}
          icon={icon}
          label={name}
          withSideChildren
        >
          <Chevron
            className="group-data-[state=open]/collapsible:rotate-180 ml-auto cursor-pointer"
            onClick={handleChevronClick}
          />
        </SidebarMenuButton>
        <CollapsibleContent className="w-full">
          <SidebarMenuSub className="w-full pl-8.75 gap-0">
            {children.map((child) => (
              <SidebarMenuSubItem key={child.name}>
                <SidebarMenuSubButton
                  href={child.path}
                  isActive={getIsItemActive(child.path, child.exact)}
                >
                  {child.name}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
