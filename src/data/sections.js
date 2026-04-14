import { FiBookOpen, FiFolder, FiUser } from 'react-icons/fi';

const sections = [
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
  if (pathname.startsWith('/blog')) return sections[0];
  if (pathname.startsWith('/projects')) return sections[1];
  if (pathname.startsWith('/about')) return sections[2];
  return null;
}

export default sections;
