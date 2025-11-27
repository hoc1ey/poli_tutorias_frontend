'use client';

import clsx from 'clsx'
import React from 'react'
import { useAppModal } from '@/hooks';
import { TutorRequest } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { changeReviewedStatus } from '@/actions';

interface Props {
  request: TutorRequest
}

export const RequestDetailsButton = ({ request }: Props) => {

  const { openRequestDetails, openError } = useAppModal();
  const router = useRouter();

  const handleRequestDetails = async () => {

    const result = await changeReviewedStatus(request.requestId)

    if (!result.success) {
      openError({
        title: 'Error',
        message: 'Error al cargar los detalles de la tutoría.',
        btnText: 'Reintentar',
        onConfirm: () => {
          handleRequestDetails()
        }
      })
    }

    openRequestDetails({
      request,
    },
      () => {
        router.replace('/tutor/requests')
      })
  }

  return (
    <button
      disabled={request.status === 'expired'}
      onClick={handleRequestDetails}
      className={clsx("mr-[15px]", {
        "border-b border-(--dark-yellow)  cursor-pointer": request.status !== 'expired',
        "text-(--grey)": request.status === 'expired'
      })}>
      Ver Detalles
    </button>
  )
}
