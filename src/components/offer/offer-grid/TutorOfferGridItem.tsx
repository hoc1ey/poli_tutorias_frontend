import React from 'react'
import { inter, lato } from '../../../config/fonts'
import Image from 'next/image'
import { Offer } from '../../../interfaces'
import './OfferGrid.css'

interface Props {
  offer: Offer
}

const formatDDMMYYYY = (dateObj: Date) => {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

export const TutorOfferGridItem = ({ offer }: Props) => {

  const {
    subject, career, description, createdAt, mode, image, price
  } = offer;

  const dateObject = new Date(createdAt);
  const dateFormatted = formatDDMMYYYY(dateObject);
  const modeFormatted = mode === 'online' ? 'Virtual' : 'Presencial';

  return (
    <div className="sm:flex sm:justify-end">
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
          className={`${inter.className} text-[14px] text-(--grey-blue)`}
        >
          Publicado {dateFormatted}
        </p>
        <span
          className={`
            ${inter.className} w-fit
            font-extrabold text-[14px] text-(--dark-blue)
            bg-(--light-blue) rounded-[10px]
            px-[16px] h-[25px] mt-[8px]
            `}
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
