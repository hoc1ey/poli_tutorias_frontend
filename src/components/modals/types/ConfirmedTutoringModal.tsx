import React from 'react'
import { TutorRequest } from '@/interfaces';
import { PiCheckCircleLight } from 'react-icons/pi';
import { formatDate, formatRequestHours } from '../../../utils';

interface Props {
  request: TutorRequest
  onClose: () => void;
}

export const ConfirmedTutoringModal = ({ request, onClose }: Props) => {

  const formattedMode = request.offer.offerMode === 'in-person' ? 'Presencial' : 'Online';

  return (
    <div className="relative w-fit max-w-[896px] max-h-[90vh] md:max-h-[700px] rounded-2xl bg-white py-[22px] pl-[30px] shadow-lg overflow-hidden">
      <div className="overflow-y-auto max-h-[calc(90vh-44px)] md:max-h-[calc(700px-44px)] mr-[10px]">
        <div className='pr-[10px]'>
          <div className='modal-icon-container'>
            <PiCheckCircleLight size={56} className='bg-(--light-green) rounded-full text-(--green)' />
          </div>

          <h1
            className='w-full font-montserrat font-bold text-[30px] text-(--dark-blue) text-center my-[18px]'
          >
            Tutoría Confirmada
          </h1>

          <p
            className='w-full font-lato font-light text-[18px] text-center'
          >
            Has aceptado la solicitud, aquí está el resumen:
          </p>

          <div className='w-[533px] mr-[10px] h-fit flex flex-col gap-[19px] my-[26px] px-[17px] py-[11px] rounded-[5px] bg-(--grey-message-background) font-inter text-(--dark-blue)'>

            <div className='w-full h-fit flex flex-col gap-[15px] text-[16px]'>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Materia:</span>
                <p className='w-full text-right font-medium'>{request.subjectName}</p>
              </div>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Estudiante:</span>
                <p className='w-full text-right font-medium'>{request.student.studentName}</p>
              </div>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Fecha:</span>
                <p className='w-full text-right font-medium'>{formatDate(new Date(request.date))}</p>
              </div>

            </div>

            <div className='w-full h-fit flex flex-col gap-[15px] text-[16px]'>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Hora/s:</span>
                <p className='w-full text-right font-medium'>{formatRequestHours(request.hours)}</p>
              </div>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Modalidad:</span>
                <p className='w-full text-right font-medium'>{formattedMode}</p>
              </div>

              <div className='flex'>
                <span className='w-[160px] font-normal'>Lugar:</span>
                <p className='w-full text-right font-medium'>{request.offer.offerIndications}</p>
              </div>

            </div>

            <hr className='text-(--grey)' />

            <div className='flex'>
              <span className='w-[160px] font-normal text-[18px]'>Valor Total:</span>
              <p className='w-full text-right font-semibold'>${request.price}</p>
            </div>

          </div>

          <div className='flex flex-col gap-[15px] font-inter text-[16px] text-(--dark-blue) px-[17px]'>

            <h2 className='font-bold'>Datos de Contacto del Estudiante</h2>

            <div className='flex'>
              <span className='font-bold'>Email:</span>
              <p>&nbsp;{request.student.studentEmail}</p>
            </div>

            <div className='flex'>
              <span className='font-bold'>Teléfono:</span>
              <p>&nbsp;{request.student.studentPhone}</p>
            </div>

          </div>

          <hr className='text-(--grey) my-[20px]' />


          <div className='flex items-end justify-end'>
            <button
              onClick={() => {
                onClose()
              }}
              className='btn-dark-blue font-lato font-bold text-[16px] px-[20px] py-[6px]'
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
