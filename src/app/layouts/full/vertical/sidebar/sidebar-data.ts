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
    iconName: 'file',
    route: '/dashboard/documents',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'home',
    route: '/authentication/register',
  },
];
