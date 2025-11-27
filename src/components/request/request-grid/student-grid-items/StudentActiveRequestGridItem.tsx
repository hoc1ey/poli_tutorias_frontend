'use client';

import clsx from 'clsx'
import React from 'react'
import './ActiveRequestGridItem.css'
import { StudentRequest } from '@/interfaces'
import { formatRequestDate } from '../../../../utils'
import { useAppModal } from '../../../../hooks';

interface Props {
  request: StudentRequest
}

export const StudentActiveRequestGridItem = ({ request }: Props) => {

  const { openCancelRequest } = useAppModal();

  const formattedStatus = request.status === 'scheduled'
    ? 'Agendado'
    : (request.status === 'conflict' || 'pending')
      ? 'Pendiente'
      : 'Otro';

  const formattedMode = request.offer.mode === 'online'
    ? 'Virtual' : 'Presencial';

  const handleCancel = () => {
    openCancelRequest({
      requestId: request.requestId,
      action: 'cancel-student',
      requestStatus: request.status,
    });
  }

  return (
    <div className="container">

      <div className="flex items-center">

        <div className="info-section">

          <span className="text-bold text-[20px]"
          >
            {request.offer.subject}
          </span>

          <p className="text-small">
            <span className="text-semibold">
              Tutor:
            </span>
            {" "}{request.offer.tutor?.name}
          </p>

          <p className="text-small">
            <span className="text-semibold">
              Horario:
            </span>
            {" "}{formatRequestDate(request.date, request.hours)}
          </p>

          <p className="text-small">
            <span className="text-semibold">
              Total:
            </span>
            {" $"}{request.price}
          </p>

        </div>

        <div className="status-container">
          <p
            className={clsx("status-badge", {
              "scheduled-status": request.status === 'scheduled',
              "pending-status": request.status === 'pending' || request.status === 'conflict',
            })}
          >
            {formattedStatus}
          </p>

          <button className='btn-dark-blue w-[184px] font-lato font-bold text-[18px] px-[20px] py-[8px] cursor-pointer' onClick={handleCancel}>
            Cancelar Tutoría
          </button>

        </div>

      </div>

      {
        request.status === 'scheduled' && (
          <>
            <hr className="divider" />

            <div className="details-container">

              <div className="detail-item">
                <span className="text-bold">
                  Modalidad:
                </span>
                <p className="">
                  {formattedMode}
                </p>
              </div>

              <div className="detail-item">
                <span className="text-bold">
                  Indicaciones de la reunión:
                </span>
                <p className="">
                  {request.offer.indications}
                </p>
              </div>

              <div className="detail-item">
                <span className="text-bold">
                  Contacto del tutor:
                </span>
                <p className="">
                  {request.offer.tutor?.primaryPhone}
                </p>
              </div>

            </div>
          </>
        )
      }

    </div>
  )
}
