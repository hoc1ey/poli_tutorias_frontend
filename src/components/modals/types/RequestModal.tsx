'use client';

import Image from 'next/image'
import React from 'react'
import { Tutor } from '@/interfaces'
import { FormTextarea } from '../../ui/form-textarea/FormTextarea';
import { useRequestModal } from '@/hooks';
import { FormInput } from '../../ui/form-input/FormInput';

export const formatTimeRequest = (date: Date, hour: number): string => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const dayName = daysOfWeek[date.getDay()];

  const startHour = hour.toString().padStart(2, '0');
  const endHour = (hour + 1).toString().padStart(2, '0');

  return `${dayName}: ${startHour}:00 - ${endHour}:00`;
};

interface Props {
  tutor: Tutor;
  onClose: () => void;
}

export const RequestModal = ({ tutor, onClose }: Props) => {

  const {
    hours,
    day,
    price,
    formattedPaymentMethod,
    handleSubmit,
    onSubmit,
    register,
    errors,
    user,
    isSubmitting
  } = useRequestModal();

  return (
    <div className="relative w-fit max-w-[896px] rounded-2xl bg-white py-[30px] px-[41px] shadow-lg">
      <h1 className='font-montserrat font-bold text-[30px] text-(--dark-blue)'>Planifica tu tutoría</h1>

      <div className='flex gap-[50px] mx-[20px] mt-[30px]'>

        <div className='flex flex-col gap-[10px] items-center'>
          <Image
            src={tutor.image}
            alt={`Foto de perfil del tutor ${tutor.name}`}
            width={96}
            height={96}
            className='rounded-full w-24 h-24 object-cover'
          />

          <div className='flex flex-col gap-[7px] justify-center align-middle items-center'>

            <span
              className='font-inter font-bold text-[20px] text-(--dark-blue)'
            >
              {tutor.name}
            </span>

            {
              hours.map(hour => (
                <p key={`${day}-${hour}`} className='font-inter font-normal text-[14px] text-(--grey) w-fit text-center max-w-[200px]'
                >
                  {formatTimeRequest(day!, hour)}
                </p>
              ))
            }

            <p className='font-inter font-normal w-fit text-[14px] text-center text-(--grey-blue) max-w-[200px]'
            >
              Método de pago: {formattedPaymentMethod}
            </p>

            <div className='flex gap-[5px] bg-(--light-blue) rounded-[8px] px-[13px] py-[8px] font-inter font-extrabold text-(--dark-blue) mx-auto min-w-[90px] justify-center items-center'>

              <span className='text-[14px]'>
                ${price * hours.length}
              </span>
              <p className='text-[12px] self-end'>total {`(${hours.length}h)`}</p>

            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px]'>

          <FormTextarea
            id={'studentMessage'}
            label={'Tu mensaje para el tutor:'}
            labelClassName='font-ibm font-bold text-[16px] text-(--dark-blue)'
            register={register}
            errors={errors}
            className='w-[529px] h-[124px]'
            placeholder='Preséntate y explica brevemente qué necesitas reforzar'
            textareaClassName='p-[10px] mt-[8px]'
            validation={{
              maxLength: {
                value: 150,
                message: 'Solo se permiten 150 caracteres en el mensaje.'
              }
            }}
            maxLength={150}
          />

          <div className='flex flex-col gap-[8px]'>
            <label htmlFor="email" className='font-ibm font-bold text-[16px] text-(--dark-blue)'>
              Tus datos de contacto
            </label>
            <p className='font-inter font-normal text-[16px] text-(--grey-blue) max-w-[529px]'>
              Esta información se compartirá con el tutor una vez confirme la solicitud.
            </p>

            <div className='flex gap-[16px]'>

              <FormInput
                id={'studentEmail'}
                label={'Correo electrónico'}
                register={register}
                errors={errors}
                labelClassName='font-ibm font-medium text-[16px] text-(--dark-blue)'
                inputClassName='w-[332px] h-[43px] rounded-[18px] mt-[8px] px-[10px] placeholder:font-ibm placeholder:font-light placeholder:text-[16px]'
                placeholder={user?.email}
                validation={{
                  validate: (value) => {
                    return !value || value.trim() === '' || (value.includes('@') && value.includes('.')) || 'Correo inválido';
                  }
                }}
              />

              <FormInput
                id={'studentPhone'}
                label={'Celular'}
                register={register}
                errors={errors}
                labelClassName='font-ibm font-medium text-[16px] text-(--dark-blue)'
                inputClassName='w-[181px] h-[43px] rounded-[18px] mt-[8px] px-[10px] placeholder:font-ibm placeholder:font-light placeholder:text-[16px]'
                placeholder={user?.primaryPhone}
                validation={{
                  validate: (value) => {
                    return !value || value.trim() === '' || (value.length === 10 && value.startsWith('09') && /^\d+$/.test(value)) || 'Celular inválido';
                  }
                }}
                maxLength={10}
              />

            </div>

          </div>

          <div className='flex gap-[12px] items-end justify-end'>

            <button
              type='button'
              disabled={isSubmitting}
              onClick={() => {
                onClose();
              }}
              className='btn-dark-blue px-[40px] py-[8px] font-bold font-lato text-[18px]'
            >
              Cancelar
            </button>

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn-dark-yellow px-[20px] py-[8px] font-bold font-lato text-[18px] max-w-[175px]'
            >
              {
                isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
                ) :
                  'Enviar solicitud'
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}
