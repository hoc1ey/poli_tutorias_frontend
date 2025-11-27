'use client';

import React from 'react'
import { useAppModal } from '../../../hooks';
import { useRouter } from 'next/navigation';
import './OfferTitle.css'

interface Props {
  isSubmitting: boolean;
}

export const NewOfferTitle = ({ isSubmitting }: Props) => {

  const { openWarning } = useAppModal();
  const router = useRouter();

  return (
    <div>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-3/4'>
          <span className="section-title">Publicar Oferta</span>
        </div>
        <div className='w-full md:w-1/4 flex md:justify-end items-start mt-2 md:mt-0'>
          <button
            type='button'
            disabled={isSubmitting}
            className="btn-dark-blue button"
            onClick={() => {
              openWarning(
                {
                  message: "¿Estás seguro/a de cancelar la publicación de la oferta?",
                  confirmBtnText: "Sí",
                  cancelBtnText: "No",
                  onConfirm: () => {
                    router.replace("/tutor/offers");
                  },
                }
              )
            }}
          >
            Cancelar
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className="btn-dark-yellow button"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
            ) : (
              'Guardar'
            )}
          </button>
        </div>

      </div>

      <hr className='text-(--grey)' />

      <p
        className="mt-[5px] section-description"
      >Crea una nueva publicación ofertando tu tutoría, procura llenar todos los campos obligatorios.</p>
    </div>
  )
}
