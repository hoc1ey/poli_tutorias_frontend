import Link from 'next/link'
import React from 'react'
import { dancingScript, montserrat } from '@/config/fonts'
import { TopMenuItem } from './TopMenuItem';
import { ProfileImage } from '../profile-image/ProfileImage';

interface Props {
  menuItems: {
    title: string;
    href: string;
    matchPathname: string;
    matchPrefixes?: string[];
  }[];
  image: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export const TopMenu = async ({ menuItems, image, name, lastName, email, role }: Props) => {


  return (
    <nav
      className='w-full h-[76px] bg-(--dark-blue) px-[31px]'
    >

      <div className='flex justify-between items-center h-full'>
        <Link href={"/"}>
          <span className={`${montserrat.className} antialiased font-bold text-(--white) text-4xl`}>
            Poli
          </span>
          <span
            className={`${dancingScript.className} antialiased text-(--dark-yellow) text-xl`}
          >Tutorías</span>
        </Link>

        <div className="flex items-center">

          {
            menuItems.map((item) => (
              <TopMenuItem
                key={`${item.title}${item.href}`}
                title={item.title} href={item.href}
                matchPrefixes={item.matchPrefixes}
                matchPathname={item.matchPathname}
              />
            ))
          }
          <ProfileImage
            image={image}
            name={name}
            lastName={lastName}
            email={email}
            role={role}
          />

        </div>
      </div>



    </nav>
  )
}
