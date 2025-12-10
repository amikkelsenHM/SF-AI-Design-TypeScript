'use client';

import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Separator } from '@/components/components/ui/separator';
import { Skeleton } from '@/components/components/ui/skeleton';
import { cn } from '@/components/lib/utils';
import Link from 'next/link';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SB_W_EXP = 256; // px
export const SB_W_COL = 72; // px
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx)
    throw new Error('useSidebar must be used within a SidebarProvider.');
  return ctx;
}

export function SidebarProvider({
  defaultOpen = false,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultOpen;

    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`));

    return match ? match.split('=')[1] === 'true' : defaultOpen;
  });

  React.useEffect(() => {
    const getSidebarStateFromCookie = () => {
      const name = `${SIDEBAR_COOKIE_NAME}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length) === 'true';
        }
      }
      return defaultOpen;
    };

    if (_open === null) {
      _setOpen(getSidebarStateFromCookie());
    }
  }, [defaultOpen, _open]);

  const open = openProp ?? (_open !== null ? _open : defaultOpen);

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) setOpenProp(next);
      else _setOpen(next);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [open, setOpenProp]
  );

  const toggleSidebar = React.useCallback(() => setOpen((x) => !x), [setOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSidebar]);

  const state: 'expanded' | 'collapsed' = open ? 'expanded' : 'collapsed';

  const ctx: SidebarContextProps = React.useMemo(
    () => ({ state, open, setOpen, toggleSidebar }),
    [state, open, setOpen, toggleSidebar]
  );

  if (_open === null && typeof window !== 'undefined') {
    return null;
  }

  return (
    <SidebarContext.Provider value={ctx}>
      <div
        suppressHydrationWarning
        data-slot="sidebar-wrapper"
        style={
          {
            '--sb-w-exp': `${SB_W_EXP}px`,
            '--sb-w-col': `${SB_W_COL}px`,
            ...style,
          } as React.CSSProperties
        }
        className={cn('min-h-svh w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = 'left',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { side?: 'left' | 'right' }) {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn('peer group/sidebar md:block')}
      data-state={state}
      data-side={side}
      data-slot="sidebar"
      onClick={toggleSidebar}
      {...props}
    >
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 h-svh transition-[width] duration-300 ease-in-out',
          'w-[256px] group-data-[state=collapsed]/sidebar:w-[72px]',
          side === 'left' ? 'left-0' : 'right-0',
          'bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden',
          className
        )}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      size="icon"
      className={cn('size-7', className)}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative flex min-h-svh flex-1 flex-col box-border overflow-x-hidden transition-[padding] duration-300 ease-in-out',
        'peer-data-[side=left]:pl-[276px] peer-data-[side=left]:peer-data-[state=collapsed]:pl-[92px]',
        'peer-data-[side=right]:pr-[276px] peer-data-[side=right]:peer-data-[state=collapsed]:pr-[92px]',
        className
      )}
      {...props}
    />
  );
}

export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex min-h-0 flex-1 flex-col overflow-hidden', className)}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn('relative flex w-full min-w-0 flex-col p-0', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        'text-sidebar-foreground/70 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear [&>svg]:size-6 [&>svg]:shrink-0',
        'group-data-[state=collapsed]/sidebar:-mt-8 group-data-[state=collapsed]/sidebar:opacity-0',
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn(
        'relative min-h-[72px] flex items-center w-full',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuButton({
  href,
  isActive = false,
  hasActiveChildren = false,
  withSideChildren = false,
  icon,
  label,
  children,
  className,
  ...props
}: {
  href: string;
  isActive?: boolean;
  hasActiveChildren?: boolean;
  withSideChildren?: boolean;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentProps<'a'>) {
  const IconNode =
    typeof icon === 'function'
      ? React.createElement(icon as any, { className: 'size-6' })
      : icon;

  const inner = (!children || withSideChildren) && (
    <span className="flex items-center gap-3">
      <span className="flex items-center justify-center min-w-6">
        {IconNode}
      </span>
      <span
        className={cn(
          '_label text-sm typography-body-bold-sm text-foreground whitespace-nowrap',
          'group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:overflow-hidden group-data-[state=collapsed]/sidebar:pointer-events-none',
          'group-data-[state=expanded]/sidebar:w-auto group-data-[state=expanded]/sidebar:opacity-100',
          'transition-[width,opacity] duration-300 ease-in-out'
        )}
      >
        {label}
      </span>
    </span>
  );

  return (
    <Link
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        'relative flex h-full w-full items-center justify-start px-6 py-6 gap-3 cursor-pointer',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        isActive &&
          !hasActiveChildren &&
          'after:absolute after:inset-y-0 after:left-0 after:w-1 after:bg-medium-orchid',
        'transition-colors duration-200',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      href={href}
      {...props}
    >
      {inner}
      {children}
    </Link>
  );
}

export function SidebarMenuAction({
  className,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & { showOnHover?: boolean }) {
  return (
    <button
      data-slot="sidebar-menu-action"
      className={cn(
        'text-sidebar-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform [&>svg]:size-6 [&>svg]:shrink-0 cursor-pointer',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        'group-data-[state=collapsed]/sidebar:hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & { showIcon?: boolean }) {
  const width = React.useMemo(
    () => `${Math.floor(Math.random() * 40) + 50}%`,
    []
  );
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1"
        style={{ maxWidth: width }}
        data-sidebar="menu-skeleton-text"
      />
    </div>
  );
}

export function SidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        'hidden group-data-[state=expanded]/sidebar:flex flex-col gap-1 pl-12',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn('relative', className)}
      {...props}
    />
  );
}

export function SidebarMenuSubButton({
  isActive = false,
  className,
  href,
  ...props
}: React.ComponentProps<'a'> & { isActive?: boolean; href: string }) {
  return (
    <Link
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        'typography-body-sm text-sidebar-foreground border-l border-l-background-progress rounded-none pl-6 px-3 hover:border-l-4 hover:text-medium-orchid hover:typography-body-bold-sm hover:border-l-medium-orchid active:border-l-4 active:text-medium-orchid active:typography-body-bold-sm active:border-l-medium-orchid flex h-11 min-w-0 -translate-x-px items-center gap-2 overflow-hidden outline-hidden [&>span:last-child]:truncate [&>svg]:size-6 [&>svg]:shrink-0 cursor-pointer transition-all ease-out duration-300',
        isActive &&
          'border-l-4 border-medium-orchid typography-body-bold-sm text-medium-orchid',
        'group-data-[state=collapsed]/sidebar:hidden',
        className
      )}
      href={href}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}
