import React from 'react'
import { Offer } from '@/interfaces'
import Image from 'next/image';
import './OfferDetailHeader.css'

interface Props {
  offer: Offer;
}

export const OfferDetailHeader = ({ offer }: Props) => {

  const formattedMode = offer.mode === 'online' ? 'Virtual' : 'Presencial';

  return (
    <div className='bg-(--blue) w-full flex px-[35px] py-[17px] items-center justify-center'>

      <div className='flex flex-col gap-[5px] text-white w-4/5 mr-[40px]'>

        <h1 className="subject-name">{offer.subject}</h1>

        <p className="offer-info">{offer.career}</p>

        <p className="offer-info font-bold">{formattedMode}</p>

        <p className="offer-info">Impartido por: {' '}
          <span className="foffer-info font-bold"
          >
            {offer.tutor?.name}
          </span>
        </p>

        <p className="offer-info">Contacto: {' '}
          <span className="offer-info font-bold"
          >
            {offer.tutor?.primaryPhone}
          </span>
        </p>

      </div>

      <div className="relative w-[213px] h-[133.13px] shrink-0 overflow-hidden">
        <Image
          src={offer.image}
          alt={'Foto de portada de la oferta'}
          fill
          className="object-cover"
        />
      </div>

    </div>
  )
}
