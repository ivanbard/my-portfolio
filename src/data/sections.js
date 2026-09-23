import { FiBookOpen, FiFolder, FiHome, FiUser } from 'react-icons/fi';

const sections = [
  {
    key: 'home',
    name: 'Home',
    to: '/',
    icon: FiHome,
    color: '#3b6db3',
  },
  {
    key: 'writing',
    name: 'Writing',
    to: '/blog',
    icon: FiBookOpen,
    color: '#c27a1a',
  },
  {
    key: 'projects',
    name: 'Projects',
    to: '/projects',
    icon: FiFolder,
    color: '#3b6db3',
  },
  {
    key: 'about',
    name: 'About',
    to: '/about',
    icon: FiUser,
    color: '#4f8a5b',
  },
];

export function getActiveSection(pathname) {
  return sections.find(({ to }) => pathname === to || (to !== '/' && pathname.startsWith(`${to}/`))) ?? null;
}

export default sections;
