'use client';

import React, { useState } from 'react'
import { TutorRequest } from '@/interfaces'
import { AiOutlineClose } from 'react-icons/ai';
import { formatRequestDate } from '../../../utils';
import { useAppModal } from '../../../hooks';
import { useRouter } from 'next/navigation';
import { confirmRequest } from '../../../actions';

interface Props {
  request: TutorRequest
  onClose: () => void;
}

export const RequestDetailsModal = ({ request, onClose }: Props) => {

  const { openConfirmedTutoring, openError } = useAppModal();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleConfirmRequest = async () => {

    setIsSubmitting(true)

    const { success } = await confirmRequest(request.requestId);

    if (success) {
      openConfirmedTutoring({
        request,
      },
        () => {
          router.replace('/tutor/requests');
        }
      )
      setIsSubmitting(false)
      return;
    }

    openError({
      title: 'Error',
      message: 'Error al confirmar la tutoría',
      btnText: 'Cerrar'
    })
    setIsSubmitting(false)
  }

  return (
    <div className="relative w-fit max-w-[896px] rounded-2xl bg-white py-[30px] pl-[41px] pr-[20px] shadow-lg">
      <div className='flex gap-[20px]'>
        <div className='flex flex-col w-[588px]'>

          <h1 className='font-montserrat font-bold text-[30px] text-(--dark-blue)'>Detalles de la Solicitud</h1>

          <hr className='text-(--grey) my-[20px]' />

          <div className='flex flex-col gap-[14px] font-inter text-[16px] text-(--dark-blue)'>

            <div className='flex'>
              <span className='w-[160px] font-medium'>Materia:</span>
              <p className='w-full text-right'>{request.subjectName}</p>
            </div>

            <div className='flex'>
              <span className='w-[160px] font-medium'>Horario:</span>
              <p className='w-full text-right'>{formatRequestDate(request.date.toString(), request.hours, true)}</p>
            </div>

            <div className='flex'>
              <span className='w-[160px] font-semibold'>Total:</span>
              <p className='font-bold w-full text-right'>${request.price}</p>
            </div>

          </div>

          <hr className='text-(--grey) my-[20px]' />

          <span className='font-inter font-semibold text-[16px] text-(--dark-blue) mb-[14px]'>Información del estudiante</span>

          <div className='flex font-inter text-(--dark-blue)'>
            <span className='w-[160px] font-medium text-[16px]'>Estudiante:</span>
            <p className='w-full text-right'>{request.student.studentName}</p>
          </div>

          <hr className='text-(--grey) my-[20px]' />


          <p
            className='font-inter font-bold text-[16px] text-(--dark-blue) mb-[10px]'
          >
            Mensaje del estudiante:
          </p>

          {
            request.student.studentMessage ? (
              <div
                className='w-full italic p-[17px] border-[0.5px] border-(--grey-border) rounded-[8px] bg-(--grey-message-background)'
              >
                &quot;{request.student.studentMessage}&ldquo;
              </div>
            ) : (
              <p className={`font-montserrat italic text-l text-center text-(--dark-blue)`}>El estudiante no dejó un mensaje</p>
            )
          }

          <div className='flex items-end justify-end mt-[40px]'>
            <button
              disabled={isSubmitting}
              onClick={handleConfirmRequest}
              className='btn-dark-yellow px-[40px] py-[10px] font-lato font-bold text-[18px]'
            >
              {
                isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
                ) :
                  'Confirmar'
              }
            </button>
          </div>

        </div>
        <div
          onClick={() => {
            onClose();
          }}
          className='cursor-pointer'
        >
          <AiOutlineClose size={14} className='font-bold' />
        </div>
      </div>
    </div>
  )
}
