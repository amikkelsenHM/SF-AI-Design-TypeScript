'use client';

import { Avatar, AvatarFallback } from '@/components/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/components/ui/sidebar';
import { useAccountMy } from 'hooks/queries/accountQuery';

export function NavUser() {
  const { data } = useAccountMy();
  const { firstName, lastName } = data?.payload || {};

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton href="/settings" className="p-3.5 gap-4">
          <Avatar className="h-11 w-11 rounded-l-full bg-[#bdbdbd]">
            <AvatarFallback className="text-background typography-body-bold-md text-lg">
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-sm typography-body-bold-sm ">
              {firstName} {lastName}
            </span>
            <span className="text-xs">Account Settings</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
