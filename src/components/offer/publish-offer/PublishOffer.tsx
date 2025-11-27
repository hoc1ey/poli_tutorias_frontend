'use client'

import React, { useEffect, useState } from 'react'
import { AvailableCareers, OfferFormInputs } from '../../../interfaces';
import { useAppModal } from '../../../hooks';
import { useForm } from 'react-hook-form';
import { NewOfferTitle } from '@/components';
import { OfferForm } from '@/components';
import { useRouter } from 'next/navigation';
import { createOffer } from '../../../actions';

interface Props {
  availableCareersAndSubjects: AvailableCareers;
  hasSchedule: boolean;
}

export const PublishOffer = ({ availableCareersAndSubjects, hasSchedule }: Props) => {

  const { openError, openCheck } = useAppModal()
  const router = useRouter()

  useEffect(() => {
    if (!hasSchedule) {
      openError({
        message: 'Configura tu horario antes de publicar una oferta.',
        btnText: 'Ir a Mi Horario',
        onConfirm: () => {
          router.push('/tutor/schedule')
        }
      },
        () => {
          router.push('/tutor/schedule')
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSchedule])

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<OfferFormInputs>();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!availableCareersAndSubjects) {
      openError(
        {
          message: "No hay asignaturas disponibles",
          btnText: "Aceptar",
          onConfirm: () => {
            router.replace("/tutor/offers");
          },
        },
        () => {
          router.replace("/tutor/offers");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCareersAndSubjects])

  if (!availableCareersAndSubjects) return (<></>)

  const onSubmit = async (data: OfferFormInputs) => {

    setIsSubmitting(true)

    const formData = new FormData();

    formData.append("imageFile", data.image[0]);
    formData.append("career", data.career);
    formData.append("subject", data.subject);
    formData.append("mode", data.mode);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("indications", data.indications);

    const { success, message, statusCode } = await createOffer(formData);

    setIsSubmitting(false)

    success
      ? openCheck(
        {
          message: 'La Oferta ha sido creada exitosamente',
          btnText: 'Ir a Mis Ofertas',
          onConfirm: () => {
            router.replace('/tutor/offers');
          },
        },
        () => {
          router.replace('/tutor/offers');
        }
      )
      : openError({
        message: statusCode === 409 ? 'Ya existe una oferta para esta Carrera y Materia.' : message,
        btnText: 'Aceptar',
      });

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <NewOfferTitle isSubmitting={isSubmitting} />

      <div className='mx-2 md:mx-20'>
        <OfferForm
          availableCareersAndSubjects={availableCareersAndSubjects}
          setUploadedFile={setUploadedFile}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>
    </form>
  )
}