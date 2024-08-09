import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },/*
  {
    displayName: 'Dashboard',
    iconName: 'home',
    route: '/dashboard',
  },*/
  {
    displayName: 'Documents',
    children: [
      {
        displayName: 'List Documents',
        iconName: 'file',
        route: '/dashboard/documents',
      },
      {
        displayName: 'Add Documents',
        iconName: 'clipboard-plus',
        route: '/dashboard/add-documents',
      },
    ],
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'certificate',
    route: '/authentication/register',
  },
  {
    displayName: 'Logout',
    iconName: 'logout-2',
    route: '',
    logout: true
  },
];
