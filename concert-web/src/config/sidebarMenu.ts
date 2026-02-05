import { SidebarItem } from '@/src/types';

export const SIDEBAR_MENU_CONFIG: SidebarItem[] = [
  {
    label: 'Home',
    href: '/admin',
    icon: '/images/home.svg',
    roles: ['ADMIN'],
  },
  {
    label: 'History',
    href: '/admin/history',
    icon: '/images/inbox.svg',
    roles: ['ADMIN'],
  }
];