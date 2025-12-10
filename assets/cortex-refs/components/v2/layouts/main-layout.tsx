'use client';

import { ReactNode } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/components/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';

export default function MainLayout({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="p-5 overflow-auto w-full">
        <div className="mx-auto w-full max-w-[1640px] md:max-w-[1440px]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
