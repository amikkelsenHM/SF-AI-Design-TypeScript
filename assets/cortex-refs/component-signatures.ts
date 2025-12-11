/**
 * COMPONENT SIGNATURES FOR AI GENERATION
 * 
 * This file serves as a reference for the AI to understand the available React components,
 * their props, and import paths. It is NOT intended to be imported in the application code.
 * 
 * MODE B: REACT (Production/Next-Gen)
 */

// @ts-nocheck
import { ReactNode } from 'react';

// --- BUTTON ---
// Import: import { Button } from "@/components/components/ui/button"
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'lg' | 'icon' | 'icon-sm';
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

// --- INPUT ---
// Import: import { Input } from "@/components/components/ui/input"
export interface InputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  readOnly?: boolean;
  state?: 'default' | 'error' | 'success' | 'warning';
  icon?: ReactNode; // Icon component
  iconPosition?: 'left' | 'right';
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// --- SELECT ---
// Import: import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/components/ui/select/select"
export interface SelectProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  placeholder?: string;
  size?: 'xs' | 's' | 'l';
  isMulti?: boolean;
  disabled?: boolean;
}

// --- CARD ---
// Import: import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/components/ui/card"
export interface CardProps {
  className?: string;
  children: ReactNode;
}
// Usage:
// <Card>
//   <CardHeader>
//     <CardTitle>Title</CardTitle>
//     <CardDescription>Description</CardDescription>
//     <CardAction><Button size="icon" variant="tertiary">...</Button></CardAction>
//   </CardHeader>
//   <CardContent>...</CardContent>
//   <CardFooter>...</CardFooter>
// </Card>

// --- TABLE ---
// Import: import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/components/ui/table"
// Usage:
// <Table>
//   <TableHeader>
//     <TableRow>
//       <TableHead>Header</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody>
//     <TableRow>
//       <TableCell>Cell</TableCell>
//     </TableRow>
//   </TableBody>
// </Table>

// --- BADGE ---
// Import: import { Badge, BadgeDot } from "@/components/components/ui/badge"
export interface BadgeProps {
  variant?: 'primary' | 'secondary';
  state?: 'idle' | 'success' | 'warning' | 'error' | 'accepted';
  hasDot?: boolean;
  children: ReactNode;
}

// --- DIALOG ---
// Import: import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/components/ui/dialog"
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
// Usage:
// <Dialog>
//   <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Title</DialogTitle>
//       <DialogDescription>Desc</DialogDescription>
//     </DialogHeader>
//     ...
//     <DialogFooter>...</DialogFooter>
//   </DialogContent>
// </Dialog>

// --- SHEET (Side Drawer) ---
// Import: import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/components/ui/sheet"
export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
// Usage:
// <Sheet>
//   <SheetTrigger>Open</SheetTrigger>
//   <SheetContent side="right">
//     <SheetHeader><SheetTitle>...</SheetTitle></SheetHeader>
//     ...
//   </SheetContent>
// </Sheet>

// --- TABS ---
// Import: import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/components/ui/tabs"
export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
// Usage:
// <Tabs defaultValue="tab1">
//   <TabsList>
//     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
//     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
//   </TabsList>
//   <TabsContent value="tab1">...</TabsContent>
//   <TabsContent value="tab2">...</TabsContent>
// </Tabs>

// --- CHECKBOX ---
// Import: import { Checkbox } from "@/components/components/ui/checkbox"
export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 's' | 'l';
}

// --- SWITCH ---
// Import: import { Switch } from "@/components/components/ui/switch"
export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

// --- RADIO GROUP ---
// Import: import { RadioGroup } from "@/components/components/ui/radio-group"
export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: Array<{ 
    label: ReactNode; 
    value: string; 
    disabled?: boolean;
    tooltipConfig?: any; 
  }>;
  size?: 's' | 'l';
  disabled?: boolean;
}

// --- TEXTAREA ---
// Import: import { Textarea } from "@/components/components/ui/textarea"
export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  state?: 'default' | 'error' | 'success' | 'warning';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// --- AVATAR ---
// Import: import { Avatar, AvatarImage, AvatarFallback } from "@/components/components/ui/avatar"
// Usage:
// <Avatar>
//   <AvatarImage src="..." alt="..." />
//   <AvatarFallback>CN</AvatarFallback>
// </Avatar>

// --- DROPDOWN MENU ---
// Import: import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/components/ui/dropdown-menu"
export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
// Usage:
// <DropdownMenu>
//   <DropdownMenuTrigger asChild><Button>Open</Button></DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>Profile</DropdownMenuItem>
//     <DropdownMenuItem>Billing</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
