import { HOME_BREADCRUMB_ITEM } from '@/utils/v2/generateBreadcrumbs';
import { BreadcrumbItem } from 'models/interfaces/v2/IBreadcrumb';

export const SETTINGS_COMMON_BREADCRUMBS: BreadcrumbItem[] = [
  HOME_BREADCRUMB_ITEM,
  { text: 'Settings', href: '/settings' },
];
