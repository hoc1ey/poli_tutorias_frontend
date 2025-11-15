import Image from 'next/image';
import React from 'react'
import { montserrat } from '../../../config/fonts';

interface Props {
  name: string;
  image: string;
}

export const WelcomeCard = ({ name, image }: Props) => {
  return (
    <div className='flex border-(--grey) w-full min-h-[60px] border-l-4 border-[0.5px] border-l-(--dark-yellow) rounded-r-[10px] items-center mb-[17px] shadow-[0_1px_2px_rgba(0,0,0,0.25)]'>
      <Image
        src={image}
        alt='Foto de perfil'
        width={40}
        height={40}
        className='rounded-full ml-[10px] mr-[16px]'
      />
      <p className={`${montserrat.className} font-medium text-[20px]`}>Hola de nuevo, {name}</p>
    </div>
  )
}
