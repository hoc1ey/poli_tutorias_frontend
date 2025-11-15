import React from 'react'
import { Offer } from '../../../interfaces'
import { inter, lato } from '../../../config/fonts';
import Image from 'next/image';
import './OfferGrid.css'

interface Props {
  offer: Offer
}

export const StudentOfferGridItem = ({ offer }: Props) => {

  const {
    subject, career, description, mode, image, price, tutor
  } = offer;

  const modeFormatted = mode === 'online' ? 'Virtual' : 'Presencial';

  return (

    <div className="sm:flex">
      <div className="image-container">
        <Image
          src={image}
          alt="Portada de la tutoría"
          fill
          className="object-cover"
        />
      </div>
      <div className="summary-container">
        <span
          className={`${inter.className} font-bold text-[16px] text-(--dark-blue) truncate`}
        >
          {subject}
        </span>
        <p
          className={`${lato.className} text-[14px] text-(--dark-blue)`}
        >{career}</p>
        <p
          className={`${lato.className} text-[14px] text-(--dark-blue) line-clamp-2`}
        >
          {description}
        </p>
        <p
          className={`${lato.className} text-[14px] text-(--dark-blue) line-clamp-2`}
        >
          Impartido por: <span className='font-extrabold'> {tutor?.name} </span>
        </p>
        <span
          className="mode-tag"
        >
          {modeFormatted}
        </span>
      </div>
      <div className="flex justify-end">
        <span
          className="price"
        >${price}/h</span>
      </div>
    </div>
  )
}
