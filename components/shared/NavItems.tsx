'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="flex md:flex-between flex-col md:flex-row gap-5 w-full">
      {headerLinks.map((link, i) => {
        const isActive = pathname === link.route;

        return (
          <li key={i}>
            <Link
              className={`flex-center p-medium-16 whitespace-nowrap ${
                isActive && 'text-primary-500'
              }`}
              href={link.route}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
