import React from 'react'
import { SectionMenuItem } from './SectionMenuItem';
import { Interface } from 'readline';

interface Props {
  menuItems: {
    title: string;
    query: string;
    isDefault: boolean;
  }[];
  validQueries: string[];
}

export const SectionMenu = ({ menuItems, validQueries }: Props) => {
  return (
    <nav className="flex gap-[30px] w-full border-b-[0.5px] border-(--grey)">

      {
        menuItems.map(menuItem => (
          <SectionMenuItem key={menuItem.query} menuItem={menuItem} validQueries={validQueries} />
        ))
      }
    </nav>
  )
}
