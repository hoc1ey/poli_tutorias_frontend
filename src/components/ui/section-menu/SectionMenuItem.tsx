'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface MenuItem {
  title: string;
  query: string;
  isDefault: boolean;
}

interface Props {
  menuItem: MenuItem;
  validQueries: string[];
}

export const SectionMenuItem = ({ menuItem, validQueries }: Props) => {


  const searchParams = useSearchParams();
  const router = useRouter();
  const currentQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (currentQuery && !validQueries.includes(currentQuery)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', validQueries[0]);
      router.replace(`?${params.toString()}`);
    }
  }, [currentQuery, validQueries, router, searchParams]);

  const handleClick = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', query);
    router.replace(`?${params.toString()}`);
  };

  const isActive = (menuItem.isDefault && !currentQuery) || currentQuery === menuItem.query;

  return (
    <div className="flex gap-4">
      <div
        key={menuItem.query}
        onClick={() => handleClick(menuItem.query)}
        className={`font-inter text-[16px] py-[10px] cursor-pointer
          ${isActive
            ? 'font-bold text-(--dark-blue) border-b-[3px] border-(--dark-yellow)'
            : 'text-(--grey-blue) border-b-[3px] border-transparent'
          }`}
      >
        {menuItem.title}
      </div>
    </div>
  );
};
