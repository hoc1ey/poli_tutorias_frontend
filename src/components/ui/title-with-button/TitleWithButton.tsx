'use client';

import { useRouter } from 'next/navigation';
import { lato } from '../../../config/fonts';
import { useTitleWithButton } from '@/hooks';
import { useState } from 'react';

interface Props {
  title: string
  description: string
  btnText: string

  btnHref?: string;
  btnAction?: string;
}



export const TitleWithButton = ({ title, description, btnText, btnHref, btnAction }: Props) => {

  const router = useRouter();
  const { executeAction } = useTitleWithButton(btnAction);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleOnClick = () => {

    setIsSubmitting(true)

    if (btnHref) {
      router.push(btnHref);
    } else if (btnAction) {
      executeAction();
    }
    setIsSubmitting(false)
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-3/4'>
          <h1 className="section-title">{title}</h1>
        </div>
        <div className='w-full md:w-1/4 flex md:justify-end items-start mt-2 md:mt-0'>
          <button
            onClick={handleOnClick}
            disabled={isSubmitting}
            className={
              `${lato.className} 
                  btn-dark-yellow
                  font-bold text-xl 
                  px-[40px] py-[10px]
                  cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center`
            }
          >
            {
              isSubmitting ? (
                <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
              ) :
                btnText
            }
          </button>
        </div>

      </div>

      <hr className='mb-[4px] text-(--grey)' />

      <p
        className="section-description"
      >{description}</p>

    </div>
  )
}
