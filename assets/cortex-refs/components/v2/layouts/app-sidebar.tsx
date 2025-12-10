'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/components/ui/sidebar';
import { NavUser } from '../navigation/nav-user';
import { NavigationItem } from '../navigation/navigation-item';
import LogoSection from '../navigation/side-navigation/logo-section';
import { NAVIGATION } from '../navigation/side-navigation/navigation-config';

export function AppSidebar() {
  return (
    <Sidebar side="left">
      <SidebarContent>
        <LogoSection />
        <div className="h-[64px]" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAVIGATION.map((item) => (
                <NavigationItem key={item.name} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
