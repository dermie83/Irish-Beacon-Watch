'use client';

import {
  HomeIcon,
  CloudIcon,
  CalendarIcon,
  RadioIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Lighthouses', href: '/home/lighthouse',icon: CloudIcon},
  // { name: 'Forecast', href: '/home/forecast',icon: CloudIcon},
  // { name: 'Marine', href: '/home/marine', icon: RadioIcon },
  { name: 'Historical', href: '/home/historical', icon: CalendarIcon },
  { name: 'About', href: '/home/about', icon: InformationCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
