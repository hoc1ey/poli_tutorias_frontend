'use client';

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { lato } from '../../../config/fonts'
import { usePathname } from 'next/navigation';

interface Props {
  title: string;
  href: string;
  matchPathname: string;
  matchPrefixes?: string[];
}

export const TopMenuItem = ({ title, href, matchPathname, matchPrefixes = [] }: Props) => {

  const pathname = usePathname();

  const isActive = matchPrefixes.some(prefix => pathname.startsWith(prefix))
    || pathname === matchPathname;

  return (
    <Link
      href={href}
      className="mx-2 px-4 py-2 hover:bg-(--grey-blue) transition-colors">
      <span className={clsx(
        `${lato.className} font-bold border-b-2 transition-colors`,
        {
          "text-(--dark-yellow) border-(--dark-yellow)": isActive
        },
        {
          "text-white border-transparent": !isActive
        },
      )}>{title}</span>
    </Link>
  )
}
